'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LuSearch } from 'react-icons/lu';

export default function Header() {
  return (
    <header className="flex flex-col gap-5 pb-5 md:pb-24">
      <Link
        href="/"
        className="flex w-fit items-center gap-2 transition-opacity hover:opacity-80 md:mx-auto"
      >
        <Image
          className="h-6 w-6"
          src="/logo.svg"
          width={24}
          height={24}
          alt="Logo Gaming Heaven Z"
        />
        <span className="text-h1 md:text-h1-desktop bg-gradient-linear bg-clip-text text-transparent">
          Gaming Heaven Z
        </span>
      </Link>

      <form className="md:mx-auto md:w-sm">
        <label
          htmlFor="search"
          className="shadow-pink flex w-full items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-3"
        >
          <LuSearch className="text-pink-100" strokeWidth={3} />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search games..."
            className="placeholder-opacity-100 text-pink-200 placeholder-pink-200"
          />
        </label>
      </form>
    </header>
  );
}
