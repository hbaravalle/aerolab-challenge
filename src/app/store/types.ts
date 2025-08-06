import { FilterOption } from '@/types/filters';
import { ProcessedGame } from '@/types/game';

export interface AppStoreState {
  favoriteGames: Record<string, ProcessedGame & { savedAt: number }>;
  activeFilter: FilterOption;
  popularGames: ProcessedGame[];
}

export interface AppStoreActions {
  addToFavorite: (game: ProcessedGame) => void;
  isFavorite: (slug: string) => boolean;
  removeFromFavorite: (slug: string) => void;
  getFavoriteGames: () => ProcessedGame[];
  setActiveFilter: (filter: FilterOption) => void;
  setPopularGames: (games: ProcessedGame[]) => void;
  fetchPopularGames: () => Promise<void>;
}

export interface AppStore extends AppStoreState, AppStoreActions {}
