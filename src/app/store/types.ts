import { FilterOption } from '@/types/filters';
import { ProcessedGame } from '@/types/game';

export interface AppStore {
  favoriteGames: Record<string, ProcessedGame & { savedAt: number }>;
  activeFilter: FilterOption;

  addToFavorite: (game: ProcessedGame) => void;
  isFavorite: (slug: string) => boolean;
  removeFromFavorite: (slug: string) => void;
  getFavoriteGames: () => ProcessedGame[];
  setActiveFilter: (filter: FilterOption) => void;
}
