import Image from 'next/image';
import Link from 'next/link';

import { ProcessedGame } from '@/types';
import { cn } from '@/utils/cn';
import { getCoverImage } from '@/utils/game';

export type SearchDropdownView =
  | 'recommended'
  | 'searching'
  | 'error'
  | 'empty'
  | 'results';

export const SEARCH_LISTBOX_ID = 'search-listbox';
export const getSearchOptionId = (index: number) => `search-option-${index}`;

const STATUS_MESSAGES: Partial<Record<SearchDropdownView, string>> = {
  searching: 'Searching...',
  error: 'Search is unavailable right now. Please try again later.',
  empty: 'No results found',
};

interface SearchDropdownProps {
  isOpen: boolean;
  view: SearchDropdownView;
  items: ProcessedGame[];
  isLoadingPopularGames: boolean;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onResultClick: () => void;
}

export default function SearchDropdown({
  isOpen,
  view,
  items,
  isLoadingPopularGames,
  activeIndex,
  onActiveIndexChange,
  onResultClick,
}: SearchDropdownProps) {
  if (!isOpen) return null;

  const statusMessage = STATUS_MESSAGES[view];

  return (
    <div className="shadow-pink absolute z-20 w-full rounded-b-3xl border-x border-b border-pink-200 bg-white px-2 pt-1.5 pb-2.5">
      {view === 'recommended' && (
        <small className="block p-2 text-gray-500">Recommended</small>
      )}
      {view === 'recommended' && isLoadingPopularGames && (
        <small className="block px-3 py-2 text-gray-400">Loading...</small>
      )}
      {statusMessage && (
        <small className="block px-3 py-2 pt-3 text-gray-500">
          {statusMessage}
        </small>
      )}

      {items.length > 0 && (
        <ul id={SEARCH_LISTBOX_ID} role="listbox" aria-label="Games">
          {items.map((game, index) => (
            <li key={game.id}>
              <Link
                id={getSearchOptionId(index)}
                role="option"
                aria-selected={index === activeIndex}
                href={`/game/${game.slug}`}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors',
                  index === activeIndex && 'bg-violet-50/60 text-violet-600',
                )}
                onMouseEnter={() => onActiveIndexChange(index)}
                onClick={onResultClick}
              >
                <Image
                  className="h-[30px] w-[30px] overflow-hidden rounded-sm object-cover object-top"
                  width={30}
                  height={30}
                  src={
                    game.cover
                      ? getCoverImage(game.cover)
                      : '/cover-placeholder-square.svg'
                  }
                  alt=""
                />
                <span>{game.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
