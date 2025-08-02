interface FilterButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  'aria-selected'?: boolean;
  'aria-controls'?: string;
}

export default function FilterButton({
  children,
  isActive = false,
  onClick,
  'aria-selected': ariaSelected,
  'aria-controls': ariaControls,
}: FilterButtonProps) {
  const baseClasses =
    'cursor-pointer rounded-full px-3 py-[0.375rem] text-sm font-medium transition-colors duration-200';
  const activeClasses = 'bg-violet-900 text-white';
  const inactiveClasses =
    'bg-transparent text-violet-600 hover:text-violet-900';

  return (
    <button
      role="tab"
      aria-selected={ariaSelected ?? isActive}
      aria-controls={ariaControls}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
