export interface IGDBGame {
  id: number;
  name: string;
  summary?: string;
  cover?: {
    url: string;
  };
  rating?: number;
  first_release_date?: number;
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
  screenshots?: Array<{
    id: number;
    image_id: string;
    url: string;
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
