import { env } from './env';

interface IGDBGame {
  id: number;
  name: string;
  summary?: string;
  cover?: {
    id: number;
    url: string;
  };
  rating?: number;
  rating_count?: number;
  release_dates?: Array<{
    date: number;
    platform: {
      name: string;
    };
  }>;
  genres?: Array<{
    name: string;
  }>;
  platforms?: Array<{
    name: string;
  }>;
  involved_companies?: Array<{
    company: {
      name: string;
    };
    developer: boolean;
    publisher: boolean;
  }>;
}

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
      revalidate: 3600, // 1 hour cache
      tags: [`igdb-${endpoint}`],
    },
  });
}

export async function getGameById(id: string): Promise<IGDBGame | null> {
  try {
    const response = await igdbFetch(
      'games',
      `fields name, summary, cover.url, rating, rating_count, 
       release_dates.date, release_dates.platform.name,
       genres.name, platforms.name,
       involved_companies.company.name, involved_companies.developer, involved_companies.publisher;
       where id = ${id};`,
    );

    if (!response.ok) {
      throw new Error(`IGDB API error: ${response.status}`);
    }

    const games = await response.json();
    return games.length > 0 ? games[0] : null;
  } catch (error) {
    console.error('Error fetching game from IGDB:', error);
    return null;
  }
}

export async function getPopularGames(limit: number = 20): Promise<IGDBGame[]> {
  try {
    const response = await igdbFetch(
      'games',
      `fields name, cover.url, rating, rating_count;
       where rating > 75 & rating_count > 500;
       sort rating desc;
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
      `fields name, cover.url, rating;
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

export type { IGDBGame };
