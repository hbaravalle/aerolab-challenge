import { useEffect, useRef, useState } from 'react';

interface UseSearchDropdownProps {
  clearSearch: () => void;
}

export function useSearchDropdown({ clearSearch }: UseSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClearSearch = () => {
    clearSearch();
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleResultClick = () => {
    // Close immediately to prevent visual shift
    setIsOpen(false);

    // Clear blur timeout if pending
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    // Clear search after tiny delay to allow navigation
    setTimeout(() => {
      clearSearch();
    }, 10);
  };

  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      setIsOpen(true);
    }

    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  return {
    isOpen,
    inputRef,
    handleFocus,
    handleBlur,
    handleClearSearch,
    handleKeyDown,
    handleResultClick,
  };
}
