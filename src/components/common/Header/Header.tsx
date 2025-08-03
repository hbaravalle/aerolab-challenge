'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { LuSearch, LuX } from 'react-icons/lu';

export default function Header() {
  const [search, setSearch] = useState('');
  const [searchIsFocused, setSearchIsFocused] = useState(false);

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

      <form className="relative md:mx-auto md:w-sm">
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
            type="text"
            name="search"
            id="search"
            placeholder="Search games..."
            className="placeholder-opacity-100 w-full text-black placeholder-pink-200 transition-colors outline-none focus:text-black"
            value={search}
            onInput={e => setSearch(e.currentTarget.value)}
            onFocus={() => setSearchIsFocused(true)}
            onBlur={() => setSearchIsFocused(false)}
          />
          {searchIsFocused && (
            <LuX
              className="h-5 w-5 cursor-pointer"
              strokeWidth={2}
              onClick={() => setSearch('')}
            />
          )}
        </label>
        {searchIsFocused && (
          <div className="shadow-pink absolute z-20 w-full rounded-b-3xl border-x border-b border-pink-200 bg-white px-2 pt-1.5 pb-2.5">
            <small className="block p-2 text-gray-500">Recommended</small>
            <div className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:text-violet-600">
              <Image
                className="h-[30px] w-[30px] overflow-hidden rounded-sm object-cover object-top"
                width={30}
                height={30}
                src="https://images.igdb.com/igdb/image/upload/t_cover_big/co66n7.jpg"
                alt=""
              />
              <span>Grand Theft Auto San Andreas</span>
            </div>
          </div>
        )}
      </form>
    </header>
  );
}
