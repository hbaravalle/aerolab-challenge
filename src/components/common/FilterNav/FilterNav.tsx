'use client';

import { useEffect, useRef, useState } from 'react';

import { useAppStore } from '@/app/store';
import FilterButton from '@/components/ui/FilterButton';
import { FilterOption } from '@/types';

interface FilterNavProps {
  onFilterChange?: (filter: FilterOption) => void;
  ariaControls?: string;
}

export default function FilterNav({ ariaControls }: FilterNavProps) {
  const { setActiveFilter, activeFilter } = useAppStore(state => state);
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-16px 0px 0px 0px',
      },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-2 w-full bg-transparent" />
      <nav
        aria-label="Game collection filters"
        className="sticky top-4 z-10 mb-6 md:top-20 md:mb-10"
      >
        <ul
          role="tablist"
          className={`transition-margin flex w-fit gap-2 rounded-full bg-white p-1 md:mx-auto ${
            isSticky && 'mx-auto'
          }`}
        >
          <li>
            <FilterButton
              isActive={activeFilter === 'last-added'}
              onClick={() => setActiveFilter('last-added')}
              aria-controls={ariaControls}
              aria-selected={activeFilter === 'last-added'}
            >
              Last added
            </FilterButton>
          </li>
          <li>
            <FilterButton
              isActive={activeFilter === 'newest'}
              onClick={() => setActiveFilter('newest')}
              aria-controls={ariaControls}
              aria-selected={activeFilter === 'newest'}
            >
              Newest
            </FilterButton>
          </li>
          <li>
            <FilterButton
              isActive={activeFilter === 'oldest'}
              onClick={() => setActiveFilter('oldest')}
              aria-controls={ariaControls}
              aria-selected={activeFilter === 'oldest'}
            >
              Oldest
            </FilterButton>
          </li>
        </ul>
      </nav>
    </>
  );
}
