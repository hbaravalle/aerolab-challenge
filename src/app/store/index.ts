import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AppStore } from './types';

export const useAppStore = create(
  persist<AppStore>(
    (set, get) => ({
      favoriteGames: {},
      activeFilter: 'last-added',

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
    }),
    {
      name: 'gaming-haven-z-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
