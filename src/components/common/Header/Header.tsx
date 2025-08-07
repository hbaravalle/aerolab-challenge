'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuArrowLeft } from 'react-icons/lu';

import { useAppStore } from '@/app/store';
import SearchInput from '@/components/common/SearchInput';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { popularGames, fetchPopularGames } = useAppStore();
  const [hasLoaded, setHasLoaded] = useState(false);

  const isGameDetailPage = pathname?.includes('/game/');
  const handleGoBack = () => router.push('/');

  useEffect(() => {
    if (popularGames.length === 0) {
      fetchPopularGames();
    }
  }, [popularGames.length, fetchPopularGames]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header
      style={{ transition: 'margin-top 0.60s ease-in-out' }}
      className={`mt-11 mb-8 flex flex-col flex-wrap pb-5 md:mb-24 md:flex-row md:items-center ${isGameDetailPage ? 'md:mt-24' : 'md:mt-43'}`}
    >
      <div className="flex w-full items-center gap-2">
        <Link
          href="/"
          className={`absolute top-8 flex w-fit items-center gap-2 transition-all duration-300 ease-out md:top-30 md:right-0 md:left-0 md:mx-auto ${
            isGameDetailPage
              ? 'pointer-events-none translate-y-2 opacity-0'
              : hasLoaded
                ? 'translate-y-0 opacity-100 delay-150'
                : 'translate-y-2 opacity-0'
          }`}
        >
          <Image
            className="h-6 w-6"
            src="/logo.svg"
            width={24}
            height={24}
            alt="Logo Gaming Haven Z"
            priority
          />
          <span className="text-h1 md:text-h1-desktop bg-gradient-linear bg-clip-text text-transparent">
            Gaming Haven Z
          </span>
        </Link>
      </div>
      <div className="flex w-full flex-col items-start gap-5 md:relative md:flex-row md:items-center">
        <button
          onClick={handleGoBack}
          className={`absolute top-8 flex h-[30px] w-fit cursor-pointer items-center gap-2 font-semibold transition-all duration-300 ease-out hover:opacity-80 md:visible md:top-auto md:left-0 ${
            isGameDetailPage
              ? 'translate-y-0 opacity-100 delay-150'
              : 'pointer-events-none -translate-y-2 opacity-0'
          }`}
        >
          <LuArrowLeft className="text-violet-900" strokeWidth={2.5} />
          <span className="bg-gradient-linear bg-clip-text text-transparent">
            Back
          </span>
        </button>
        <SearchInput popularGames={popularGames} />
      </div>
    </header>
  );
}
