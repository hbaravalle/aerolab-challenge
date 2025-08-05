export interface IGDBGame {
  id: number;
  name: string;
  summary?: string;
  cover?: {
    url: string;
  };
  rating?: number;
  release_dates?: Array<{
    date: number;
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
  }>;
  slug?: string;
  similar_games?: Array<{
    name: string;
    slug?: string;
    cover?: {
      url: string;
    };
  }>;
}

export interface ProcessedGame extends Omit<IGDBGame, 'genres' | 'platforms'> {
  coverImage: string;
  developer: string;
  releaseDate: string;
  genres: string;
  platforms: string;
  formattedRating: string | null;
}
