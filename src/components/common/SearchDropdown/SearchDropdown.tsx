import Image from 'next/image';
import Link from 'next/link';

import { ProcessedGame } from '@/types';
import { getCoverImage } from '@/utils/game';

interface SearchDropdownProps {
  isOpen: boolean;
  searchResults: ProcessedGame[];
  isSearching: boolean;
  popularGames: ProcessedGame[];
  onResultClick: () => void;
  searchQuery: string;
}

export default function SearchDropdown({
  isOpen,
  searchResults,
  isSearching,
  popularGames,
  onResultClick,
  searchQuery,
}: SearchDropdownProps) {
  if (!isOpen) return null;

  if (isSearching && searchQuery.length > 0) {
    return (
      <div className="shadow-pink absolute z-20 w-full rounded-b-3xl border-x border-b border-pink-200 bg-white px-2 pt-1.5 pb-2.5">
        <small className="block px-3 py-2 pt-3 text-gray-500">
          Searching...
        </small>
      </div>
    );
  }

  if (searchResults.length === 0 && searchQuery.length > 0 && !isSearching) {
    return (
      <div className="shadow-pink absolute z-20 w-full rounded-b-3xl border-x border-b border-pink-200 bg-white px-2 pt-1.5 pb-2.5">
        <small className="block px-3 py-2 pt-3 text-gray-500">
          No results found
        </small>
      </div>
    );
  }

  if (searchResults.length <= 0) {
    return (
      <div className="shadow-pink absolute z-20 w-full rounded-b-3xl border-x border-b border-pink-200 bg-white px-2 pt-1.5 pb-2.5">
        <small className="block p-2 text-gray-500">Recommended</small>
        <div>
          {popularGames.map(game => (
            <Link
              key={game.id}
              href={`/game/${game.slug}`}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:text-violet-600"
              onClick={onResultClick}
            >
              <Image
                className="h-[30px] w-[30px] overflow-hidden rounded-sm object-cover object-top"
                width={30}
                height={30}
                src={
                  game.cover
                    ? getCoverImage(game.cover)
                    : '/cover-placeholder.svg'
                }
                alt=""
              />
              <span>{game.name}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-pink absolute z-20 w-full rounded-b-3xl border-x border-b border-pink-200 bg-white px-2 pt-1.5 pb-2.5">
      <div>
        {searchResults.map(game => (
          <Link
            key={game.id}
            href={`/game/${game.slug}`}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:text-violet-600"
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
        ))}
      </div>
    </div>
  );
}
