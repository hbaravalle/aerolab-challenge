import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { FilterOption } from '@/types/filters';

import { AppStore, FavoriteGame } from './types';

const toFavoriteGame = (
  { slug, name, cover, first_release_date }: Omit<FavoriteGame, 'savedAt'>,
  savedAt: number,
): FavoriteGame => ({ slug, name, cover, first_release_date, savedAt });

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      favoriteGames: {},
      activeFilter: 'last-added',
      popularGames: [],
      isLoadingPopularGames: false,

      addToFavorite: game => {
        set(state => ({
          favoriteGames: {
            ...state.favoriteGames,
            [game.slug!]: toFavoriteGame(
              { ...game, slug: game.slug! },
              Date.now(),
            ),
          },
        }));
      },
      isFavorite: (slug: string) => {
        return slug in get().favoriteGames;
      },
      removeFromFavorite: (slug: string) =>
        set(() => {
          const newFavorites = { ...get().favoriteGames };
          delete newFavorites[slug];
          return { favoriteGames: newFavorites };
        }),
      getFavoriteGames: () => {
        return Object.values(get().favoriteGames);
      },

      setActiveFilter: filter => {
        set({ activeFilter: filter });
      },

      setPopularGames: games => {
        set({ popularGames: games });
      },
      fetchPopularGames: async () => {
        set({ isLoadingPopularGames: true });
        try {
          const response = await fetch('/api/games/popular?limit=5');
          if (!response.ok) {
            throw new Error('Failed to fetch popular games');
          }
          const data = await response.json();
          get().setPopularGames(data);
        } catch (err) {
          console.error(err);
          get().setPopularGames([]);
        } finally {
          set({ isLoadingPopularGames: false });
        }
      },
    }),
    {
      name: 'gaming-haven-z-store',
      storage: createJSONStorage(() => localStorage),
      // Popular games are not persisted: the API response is already cached
      // and persisting them would freeze the recommendations for returning users
      partialize: state => ({
        favoriteGames: state.favoriteGames,
        activeFilter: state.activeFilter,
      }),
      version: 1,
      migrate: persisted => {
        // v0 stored full game objects and the popular games list
        const { favoriteGames = {}, activeFilter } = persisted as {
          favoriteGames?: Record<string, FavoriteGame>;
          activeFilter?: FilterOption;
        };
        return {
          activeFilter: activeFilter ?? 'last-added',
          favoriteGames: Object.fromEntries(
            Object.entries(favoriteGames).map(([slug, game]) => [
              slug,
              toFavoriteGame({ ...game, slug }, game.savedAt),
            ]),
          ),
        } as AppStore;
      },
    },
  ),
);
