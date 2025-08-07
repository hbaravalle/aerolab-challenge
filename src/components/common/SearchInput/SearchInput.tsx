'use client';

import { LuSearch, LuX } from 'react-icons/lu';

import { useSearch } from '@/hooks/useSearch';
import { ProcessedGame } from '@/types';

import SearchDropdown from '../SearchDropdown/SearchDropdown';

interface SearchInputProps {
  popularGames: ProcessedGame[];
}

export default function SearchInput({ popularGames }: SearchInputProps) {
  const {
    search,
    setSearch,
    searchResults,
    isSearching,
    searchIsFocused,
    handleClearSearch,
    handleResultClick,
    handleFocus,
    handleBlur,
    handleKeyDown,
    inputRef,
  } = useSearch();

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
          className="placeholder-opacity-100 w-full text-black placeholder-pink-200 transition-colors outline-none focus:text-black"
          value={search}
          onInput={e => setSearch(e.currentTarget.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
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
        searchQuery={search}
        searchResults={searchResults}
        isSearching={isSearching}
        popularGames={popularGames}
        onResultClick={handleResultClick}
      />
    </div>
  );
}
