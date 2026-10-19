'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LuSearch, LuX } from 'react-icons/lu';

import { useSearch } from '@/hooks/useSearch';
import { ProcessedGame } from '@/types';

import SearchDropdown, {
  getSearchOptionId,
  SEARCH_LISTBOX_ID,
  SearchDropdownView,
} from '../SearchDropdown/SearchDropdown';

// Stable reference so the active option resets only when the list changes
const NO_ITEMS: ProcessedGame[] = [];

interface SearchInputProps {
  popularGames: ProcessedGame[];
  isLoadingPopularGames: boolean;
}

export default function SearchInput({
  popularGames,
  isLoadingPopularGames,
}: SearchInputProps) {
  const router = useRouter();
  const {
    search,
    setSearch,
    searchResults,
    isSearching,
    searchError,
    searchIsFocused,
    handleClearSearch,
    handleResultClick,
    handleFocus,
    handleBlur,
    handleKeyDown,
    inputRef,
  } = useSearch();

  let view: SearchDropdownView = 'recommended';
  if (search.trim()) {
    if (isSearching) view = 'searching';
    else if (searchError) view = 'error';
    else view = searchResults.length > 0 ? 'results' : 'empty';
  }

  let items = NO_ITEMS;
  if (view === 'results') items = searchResults;
  if (view === 'recommended' && !isLoadingPopularGames) items = popularGames;

  // The highlighted option belongs to a specific list: when the list changes
  // (new results, recommendations loaded) nothing is highlighted
  const [active, setActive] = useState({ items, index: -1 });
  const activeIndex = active.items === items ? active.index : -1;
  const setActiveIndex = (index: number) => setActive({ items, index });

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchIsFocused && items.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((activeIndex + 1) % items.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(activeIndex <= 0 ? items.length - 1 : activeIndex - 1);
        return;
      }
      if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        router.push(`/game/${items[activeIndex].slug}`);
        handleResultClick();
        inputRef.current?.blur();
        return;
      }
    }
    handleKeyDown(e);
  };

  return (
    <div className="relative w-full md:mx-auto md:w-sm">
      <label
        htmlFor="search"
        className={`${
          searchIsFocused ? 'rounded-t-3xl rounded-b-none' : 'rounded-full'
        } shadow-pink flex w-full items-center gap-2 border border-pink-200 bg-white px-4 py-3`}
      >
        <LuSearch
          className={`h-4 w-4 flex-shrink-0 transition-colors ${
            searchIsFocused ? 'text-violet-600' : 'text-pink-200'
          }`}
          strokeWidth={3}
        />
        <input
          ref={inputRef}
          type="text"
          name="search"
          id="search"
          placeholder="Search games..."
          autoComplete="off"
          role="combobox"
          aria-expanded={searchIsFocused}
          aria-controls={SEARCH_LISTBOX_ID}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? getSearchOptionId(activeIndex) : undefined
          }
          className="placeholder-opacity-100 w-full text-black placeholder-pink-200 transition-colors outline-none focus:text-black"
          value={search}
          onInput={e => setSearch(e.currentTarget.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleInputKeyDown}
        />
        {searchIsFocused && search.length > 0 && (
          <LuX
            className="h-5 w-5 cursor-pointer"
            strokeWidth={2}
            onClick={handleClearSearch}
          />
        )}
      </label>

      <SearchDropdown
        isOpen={searchIsFocused}
        view={view}
        items={items}
        isLoadingPopularGames={isLoadingPopularGames}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onResultClick={handleResultClick}
      />
    </div>
  );
}
