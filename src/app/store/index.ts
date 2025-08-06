import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AppStore } from './types';

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      favoriteGames: {},
      activeFilter: 'last-added',
      popularGames: [],

      addToFavorite: game => {
        set(state => ({
          favoriteGames: {
            ...state.favoriteGames,
            [game.slug!]: {
              ...game,
              savedAt: Date.now(),
            },
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
        }
      },
    }),
    {
      name: 'gaming-haven-z-store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        favoriteGames: state.favoriteGames,
        activeFilter: state.activeFilter,
        popularGames: state.popularGames,
      }),
    },
  ),
);
