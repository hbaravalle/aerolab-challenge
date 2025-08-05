import { ReactNode } from 'react';

export default function Button({ children }: { children: ReactNode }) {
  return (
    <button className="w-full cursor-pointer rounded-full bg-violet-900 py-2 text-white">
      {children}
    </button>
  );
}
