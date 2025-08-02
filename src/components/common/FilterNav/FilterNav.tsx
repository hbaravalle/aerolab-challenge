'use client';

import { useEffect, useRef, useState } from 'react';

import FilterButton from '@/components/ui/FilterButton';
import { FilterOption } from '@/types';

interface FilterNavProps {
  defaultFilter?: FilterOption;
  onFilterChange?: (filter: FilterOption) => void;
  ariaControls?: string;
}

export default function FilterNav({
  defaultFilter = 'last-added',
  onFilterChange,
  ariaControls,
}: FilterNavProps) {
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

  const handleFilterChange = (filter: FilterOption) => {
    console.warn('handleFilterChange', filter);
    console.warn('defaultFilter', defaultFilter);
    console.warn('onFilterChange', onFilterChange);
  };

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
          <li role="presentation">
            <FilterButton
              isActive={true}
              onClick={() => handleFilterChange('last-added')}
              aria-controls={ariaControls}
              aria-selected={true}
            >
              Last added
            </FilterButton>
            <FilterButton
              isActive={false}
              onClick={() => handleFilterChange('newest')}
              aria-controls={ariaControls}
              aria-selected={false}
            >
              Newest
            </FilterButton>
            <FilterButton
              isActive={false}
              onClick={() => handleFilterChange('oldest')}
              aria-controls={ariaControls}
              aria-selected={false}
            >
              Oldest
            </FilterButton>
          </li>
        </ul>
      </nav>
    </>
  );
}
