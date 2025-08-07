import type { IGDBGame } from '@/types';

import { env } from './env';

const gameCache = new Map<string, IGDBGame | null>();
const MAX_CACHE_SIZE = 20;

const IGDB_BASE_URL = 'https://api.igdb.com/v4';

async function igdbFetch(endpoint: string, body: string): Promise<Response> {
  return fetch(`${IGDB_BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Client-ID': env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${env.IGDB_ACCESS_TOKEN}`,
      'Content-Type': 'text/plain',
    },
    body,
    next: {
      revalidate: 3600,
      tags: [`igdb-${endpoint}`],
    },
  });
}

export async function getGameBySlug(slug: string): Promise<IGDBGame | null> {
  if (gameCache.has(slug)) {
    return gameCache.get(slug) || null;
  }

  try {
    const response = await igdbFetch(
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

    if (!response.ok) {
      throw new Error(`IGDB API error: ${response.status}`);
    }

    const games = await response.json();
    const game = games.length > 0 ? games[0] : null;

    if (gameCache.size >= MAX_CACHE_SIZE) {
      const firstKey = gameCache.keys().next().value;
      gameCache.delete(firstKey || '');
    }

    gameCache.set(slug, game);
    return game;
  } catch (error) {
    console.error('Error fetching game from IGDB:', error);
    return null;
  }
}

export async function getPopularGames(limit: number = 5): Promise<IGDBGame[]> {
  try {
    const response = await igdbFetch(
      'games',
      `fields name, rating, rating_count, aggregated_rating, 
             aggregated_rating_count, total_rating, total_rating_count,
             hypes, follows, first_release_date, cover.url, slug;
      
      where total_rating > 80 
        & total_rating_count > 10
        & rating_count > 500
        & category = 0;
      
      sort total_rating desc;
      limit ${limit};`,
    );

    if (!response.ok) {
      throw new Error(`IGDB API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching popular games from IGDB:', error);
    return [];
  }
}

export async function searchGames(
  query: string,
  limit: number = 10,
): Promise<IGDBGame[]> {
  try {
    const response = await igdbFetch(
      'games',
      `fields name, cover.url, rating, slug;
       search "${query}";
       where rating != null;
       limit ${limit};`,
    );

    if (!response.ok) {
      throw new Error(`IGDB API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching games from IGDB:', error);
    return [];
  }
}
