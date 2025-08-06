import { useCallback, useEffect, useState } from 'react';

import { ProcessedGame } from '@/types';

import { useSearchDropdown } from './useSearchDropdown';

export function useSearch() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<ProcessedGame[]>([]);

  const clearSearch = useCallback(() => {
    setSearch('');
    setSearchResults([]);
  }, []);

  const clearSearchResults = useCallback(() => {
    setSearchResults([]);
  }, []);

  const dropdown = useSearchDropdown({
    clearSearch,
  });

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    const searchGames = async (query: string) => {
      try {
        const response = await fetch(
          `/api/games/search?query=${encodeURIComponent(query)}&limit=10`,
        );
        if (!response.ok) throw new Error('Search failed');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Search error:', error);
        return [];
      }
    };

    const timer = setTimeout(async () => {
      const results = await searchGames(search);
      setSearchResults(results);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return {
    search,
    setSearch,
    searchResults,
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
