'use client';

import FilterNav from '@/components/common/FilterNav';
import GameCard from '@/components/common/GameCard';
import { FilterOption } from '@/types';

export default function IndexPage() {
  const handleFilterChange = (filter: FilterOption) => {
    console.log('Filter changed to:', filter);
  };

  return (
    <section id="game-collection" aria-label="Saved games collection">
      <h2 className="text-h2 bg-gradient-linear md:text-h1-desktop mb-4 bg-clip-text text-transparent md:text-center">
        Saved games
      </h2>
      <FilterNav
        onFilterChange={handleFilterChange}
        ariaControls="game-collection"
      />
      <div
        id="game-collection-list"
        className="grid grid-cols-3 gap-2 md:grid-cols-4"
      >
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    </section>
  );
}
