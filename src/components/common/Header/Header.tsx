'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { LuArrowLeft, LuSearch, LuX } from 'react-icons/lu';

import { ProcessedGame } from '@/types';
import { getCoverImage } from '@/utils/game';

export default function Header() {
  const params = useParams();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [popularGames, setPopularGames] = useState<ProcessedGame[]>([]);
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isGameDetailPage = Boolean(params?.slug);
  const handleGoBack = () => router.push('/');

  const getPopularGames = async () => {
    try {
      const response = await fetch('/api/games/popular?limit=5');
      if (!response.ok) {
        throw new Error('Failed to fetch popular games');
      }
      const data = await response.json();
      setPopularGames(data);
    } catch (err) {
      console.error(err);
      setPopularGames([]);
    }
  };

  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      setSearchIsFocused(true);
    }
    getPopularGames();

    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      className={`flex flex-col gap-5 pb-5 md:pb-24 ${isGameDetailPage && 'md:flex-row md:items-center'}`}
    >
      {isGameDetailPage ? (
        <button
          onClick={handleGoBack}
          className="flex h-[30px] w-fit cursor-pointer items-center gap-2 font-semibold transition-opacity hover:opacity-80"
        >
          <LuArrowLeft className="text-violet-900" strokeWidth={2.5} />
          <span className="bg-gradient-linear bg-clip-text text-transparent">
            Back
          </span>
        </button>
      ) : (
        <Link
          href="/"
          className="flex w-fit items-center gap-2 transition-opacity hover:opacity-80 md:mx-auto"
        >
          <Image
            className="h-6 w-6"
            src="/logo.svg"
            width={24}
            height={24}
            alt="Logo Gaming Haven Z"
          />
          <span className="text-h1 md:text-h1-desktop bg-gradient-linear bg-clip-text text-transparent">
            Gaming Haven Z
          </span>
        </Link>
      )}

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
            ref={inputRef}
            type="text"
            name="search"
            id="search"
            placeholder="Search games..."
            className="placeholder-opacity-100 w-full text-black placeholder-pink-200 transition-colors outline-none focus:text-black"
            value={search}
            onInput={e => setSearch(e.currentTarget.value)}
            onFocus={() => {
              if (blurTimeoutRef.current) {
                clearTimeout(blurTimeoutRef.current);
              }
              setSearchIsFocused(true);
            }}
            onBlur={() => {
              blurTimeoutRef.current = setTimeout(() => {
                setSearchIsFocused(false);
              }, 150);
            }}
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
            <div>
              {popularGames.map(game => (
                <Link
                  key={game.id}
                  href={`/game/${game.slug}`}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:text-violet-600"
                  onClick={() => {
                    setSearchIsFocused(false);
                    setSearch('');
                  }}
                >
                  <Image
                    className="h-[30px] w-[30px] overflow-hidden rounded-sm object-cover object-top"
                    width={30}
                    height={30}
                    src={getCoverImage(game.cover)}
                    alt=""
                  />
                  <span>{game.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </form>
    </header>
  );
}
