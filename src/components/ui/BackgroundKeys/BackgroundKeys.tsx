'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BackgroundKeys() {
  const pathname = usePathname();
  const isGameDetailPage = pathname?.includes('/game/');
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const sharedClasses = {
    base: 'absolute -z-10',
    transition: 'transition-all duration-700 ease-out',
    bgTransition: 'transition-transform duration-700 ease-out',
    initialAnimation: 'animate-keysSlideInUp',
    gameDetailMove: 'md:-translate-y-12',
    gameDetailDimmed: 'md:opacity-75',
  };

  const gradientClasses = `
    ${sharedClasses.base}
    top-0 right-0 left-0 h-[276px] 
    bg-white bg-[linear-gradient(180deg,rgba(255,0,174,0.2)_17.78%,rgba(255,255,255,0)_92.83%)] 
    bg-cover bg-top bg-no-repeat
    ${sharedClasses.bgTransition}
  `;

  const keysMobileClasses = `
    ${sharedClasses.base}
    -top-[15px] right-0 aspect-[197/80] w-[45dvw]
    bg-cover bg-right bg-no-repeat
    md:hidden
    bg-[url(/keys.svg)]
    ${sharedClasses.transition}
  `;

  const keysDesktopClasses = `
    ${sharedClasses.base}
    -top-[20px] right-0 left-0 h-[276px]
    bg-top bg-no-repeat
    hidden md:block
    bg-[url(/keys-desktop.svg)]
    ${sharedClasses.transition}
  `;

  return (
    <>
      <div
        id="background-gradient"
        className={
          /* prettier-ignore */ `
          ${gradientClasses}
          ${isGameDetailPage ? sharedClasses.gameDetailMove : ''}
        `
        }
      />

      <div
        id="keys-mobile"
        className={
          /* prettier-ignore */ `
          ${keysMobileClasses}
          ${isGameDetailPage ? `${sharedClasses.gameDetailMove} ${sharedClasses.gameDetailDimmed}` : ''}
          ${!hasLoaded && !isGameDetailPage ? 'translate-y-5' : ''}
        `
        }
        style={{
          opacity: hasLoaded ? 1 : 0,
        }}
      />

      <div
        id="keys-desktop"
        className={
          /* prettier-ignore */ `
          ${keysDesktopClasses}
          ${isGameDetailPage ? `${sharedClasses.gameDetailMove} ${sharedClasses.gameDetailDimmed}` : ''}
          ${!hasLoaded && !isGameDetailPage ? 'translate-y-12' : ''}
        `
        }
        style={{
          opacity: hasLoaded ? 1 : 0,
        }}
      />
    </>
  );
}
