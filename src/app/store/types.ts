import { FilterOption } from '@/types/filters';
import { IGDBGame, ProcessedGame } from '@/types/game';

// Only what the collection grid needs, to keep localStorage small
export type FavoriteGame = Pick<
  IGDBGame,
  'name' | 'cover' | 'first_release_date'
> & {
  slug: string;
  savedAt: number;
};

export interface AppStoreState {
  favoriteGames: Record<string, FavoriteGame>;
  activeFilter: FilterOption;
  popularGames: ProcessedGame[];
  isLoadingPopularGames: boolean;
}

export interface AppStoreActions {
  addToFavorite: (game: ProcessedGame) => void;
  isFavorite: (slug: string) => boolean;
  removeFromFavorite: (slug: string) => void;
  getFavoriteGames: () => FavoriteGame[];
  setActiveFilter: (filter: FilterOption) => void;
  setPopularGames: (games: ProcessedGame[]) => void;
  fetchPopularGames: () => Promise<void>;
}

export interface AppStore extends AppStoreState, AppStoreActions {}
