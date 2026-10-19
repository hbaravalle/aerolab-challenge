import type { IGDBGame } from '@/types';

import { env } from './env';

const gameCache = new Map<string, IGDBGame | null>();
const MAX_CACHE_SIZE = 20;

const IGDB_BASE_URL = 'https://api.igdb.com/v4';
const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
// Renew the token a bit before Twitch expires it
const TOKEN_EXPIRY_MARGIN_MS = 60 * 60 * 1000;

let cachedToken: { value: string; expiresAt: number } | null = null;
let pendingToken: Promise<string> | null = null;

async function requestAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    client_id: env.IGDB_CLIENT_ID,
    client_secret: env.IGDB_CLIENT_SECRET,
    grant_type: 'client_credentials',
  });

  const response = await fetch(`${TWITCH_TOKEN_URL}?${params}`, {
    method: 'POST',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Twitch token error: ${response.status}`);
  }

  const { access_token, expires_in } = await response.json();
  cachedToken = {
    value: access_token,
    expiresAt: Date.now() + expires_in * 1000 - TOKEN_EXPIRY_MARGIN_MS,
  };
  return access_token;
}

async function getAccessToken(forceRefresh = false): Promise<string> {
  if (!forceRefresh && cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  // Share a single in-flight request between concurrent callers
  pendingToken ??= requestAccessToken().finally(() => {
    pendingToken = null;
  });
  return pendingToken;
}

async function igdbFetch(endpoint: string, body: string): Promise<Response> {
  const doFetch = (token: string) =>
    fetch(`${IGDB_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Client-ID': env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body,
      next: {
        revalidate: 3600,
        tags: [`igdb-${endpoint}`],
      },
    });

  const response = await doFetch(await getAccessToken());

  // Token revoked or expired early: refresh once and retry
  if (response.status === 401) {
    return doFetch(await getAccessToken(true));
  }

  return response;
}

// Escape user input before embedding it in an Apicalypse string literal
const escapeQueryString = (value: string) => value.replace(/[\\"]/g, '\\$&');

const SLUG_PATTERN = /^[a-z0-9-]+$/;

async function igdbQuery<T>(endpoint: string, body: string): Promise<T> {
  const response = await igdbFetch(endpoint, body);

  if (!response.ok) {
    throw new Error(`IGDB API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Returns null when the game does not exist. Throws when IGDB fails,
 * so callers can tell "not found" apart from an outage.
 */
export async function getGameBySlug(slug: string): Promise<IGDBGame | null> {
  if (!SLUG_PATTERN.test(slug)) {
    return null;
  }

  if (gameCache.has(slug)) {
    return gameCache.get(slug) || null;
  }

  const games = await igdbQuery<IGDBGame[]>(
    'games',
    `fields name, summary, cover.url, rating, 
     first_release_date,
     genres.name, platforms.name,
     involved_companies.company.name, involved_companies.developer,
     similar_games.name, similar_games.slug, similar_games.cover.url,
     screenshots.url,screenshots.image_id,
     slug;
     where slug = "${slug}";
     limit 1;`,
  );
  const game = games.length > 0 ? games[0] : null;

  if (gameCache.size >= MAX_CACHE_SIZE) {
    const firstKey = gameCache.keys().next().value;
    gameCache.delete(firstKey || '');
  }

  gameCache.set(slug, game);
  return game;
}

export async function getPopularGames(limit: number = 5): Promise<IGDBGame[]> {
  return igdbQuery<IGDBGame[]>(
    'games',
    `fields name, rating, rating_count, aggregated_rating,
           aggregated_rating_count, hypes, follows,
           first_release_date, cover.url, slug;

    where rating > 80
      & rating_count > 100
      & cover != null;

    sort rating_count desc;
    limit ${limit};`,
  );
}

export async function searchGames(
  query: string,
  limit: number = 10,
): Promise<IGDBGame[]> {
  return igdbQuery<IGDBGame[]>(
    'games',
    `fields name, cover.url, rating, slug;
     search "${escapeQueryString(query)}";
     where rating != null;
     limit ${limit};`,
  );
}
