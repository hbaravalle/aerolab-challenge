import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'light';
}

export default function Button({ children, onClick, variant }: ButtonProps) {
  return (
    <button
      className={`w-full cursor-pointer rounded-full py-2 transition-colors duration-300 ${
        variant === 'primary'
          ? 'border border-transparent bg-violet-900 text-white'
          : 'border border-violet-900 bg-white text-violet-900'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
