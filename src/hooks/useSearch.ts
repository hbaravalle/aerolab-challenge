import { useCallback, useEffect, useState } from 'react';

import { ProcessedGame } from '@/types';

import { useSearchDropdown } from './useSearchDropdown';

export function useSearch() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<ProcessedGame[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const clearSearch = useCallback(() => {
    setSearch('');
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  const clearSearchResults = useCallback(() => {
    setSearchResults([]);
  }, []);

  const dropdown = useSearchDropdown({
    clearSearch,
  });

  useEffect(() => {
    setSearchError(false);

    if (!search.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Aborts the in-flight request when the query changes, so a slow
    // response for an old query can't overwrite newer results
    const controller = new AbortController();

    const searchGames = async (query: string) => {
      try {
        const response = await fetch(
          `/api/games/search?query=${encodeURIComponent(query)}&limit=10`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error('Search failed');
        setSearchResults(await response.json());
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('Search error:', error);
        setSearchResults([]);
        setSearchError(true);
      }
      setIsSearching(false);
    };

    setIsSearching(true);
    const timer = setTimeout(() => searchGames(search), 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  return {
    search,
    setSearch,
    searchResults,
    isSearching,
    searchError,
    clearSearchResults,
    clearSearch,

    searchIsFocused: dropdown.isOpen,
    inputRef: dropdown.inputRef,
    handleFocus: dropdown.handleFocus,
    handleBlur: dropdown.handleBlur,
    handleClearSearch: dropdown.handleClearSearch,
    handleKeyDown: dropdown.handleKeyDown,
    handleResultClick: dropdown.handleResultClick,
  };
}
