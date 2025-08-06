'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useAppStore } from '@/app/store';
import FilterNav from '@/components/common/FilterNav';
import GameCard from '@/components/common/GameCard';
import { parseReleaseDate } from '@/utils/game';

export default function IndexPage() {
  const { favoriteGames, activeFilter } = useAppStore(state => state);
  const [isHydrated, setIsHydrated] = useState(false);
  const filteredGames = Object.values(favoriteGames).sort((a, b) => {
    if (activeFilter === 'last-added') {
      return b.savedAt - a.savedAt;
    }

    if (activeFilter === 'newest' || activeFilter === 'oldest') {
      const dateA = parseReleaseDate(a.releaseDate);
      const dateB = parseReleaseDate(b.releaseDate);

      return activeFilter === 'newest'
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    }

    return 0;
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section
        className="mb-10"
        id="game-collection"
        aria-label="Saved games collection"
      >
        <h2 className="text-h2 bg-gradient-linear md:text-h1-desktop mb-4 bg-clip-text text-transparent md:text-center">
          Saved games
        </h2>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-violet-600"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="mb-10"
      id="game-collection"
      aria-label="Saved games collection"
    >
      <h2 className="text-h2 bg-gradient-linear md:text-h1-desktop mb-4 bg-clip-text text-transparent md:text-center">
        Saved games
      </h2>
      {filteredGames.length > 0 ? (
        <>
          <FilterNav ariaControls="game-collection" />
          <div
            id="game-collection-list"
            className="grid grid-cols-3 gap-2 md:grid-cols-4"
          >
            {Object.values(filteredGames).map(game => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-19 flex flex-col items-center gap-6 md:mt-12 md:gap-10">
          <Image
            width={280}
            height={168}
            src="/empty-collection.svg"
            alt="Empty State. Nothing Collected yet"
          />
          <div className="text-center">
            <h3 className="text-md font-semibold">Nothing collected yet</h3>
            <p className="text-sm text-gray-500">
              Here you will see your collected games.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
