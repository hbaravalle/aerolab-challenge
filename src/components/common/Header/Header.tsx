'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LuArrowLeft } from 'react-icons/lu';

import { useAppStore } from '@/app/store';
import SearchInput from '@/components/common/SearchInput';

export default function Header() {
  const params = useParams();
  const router = useRouter();
  const { popularGames, fetchPopularGames } = useAppStore();

  const isGameDetailPage = Boolean(params?.slug);
  const handleGoBack = () => router.push('/');

  useEffect(() => {
    if (popularGames.length === 0) {
      fetchPopularGames();
    }
  }, [popularGames.length, fetchPopularGames]);

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
            priority
          />
          <span className="text-h1 md:text-h1-desktop bg-gradient-linear bg-clip-text text-transparent">
            Gaming Haven Z
          </span>
        </Link>
      )}

      <SearchInput popularGames={popularGames} />
    </header>
  );
}
