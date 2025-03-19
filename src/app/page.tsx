import { LuGithub } from 'react-icons/lu';

export default function IndexPage() {
  return (
    <main className="bg-background flex h-screen flex-col items-center justify-center p-2 font-mono text-white">
      <div className="mx-auto text-center">
        <div className="mx-auto w-fit">
          <svg
            width="200px"
            height="200px"
            viewBox="-0.5 0 22 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5732 17.2183C10.468 17.8361 9.18628 17.9995 8.04847 17.7581C5.33098 17.1814 3.74381 14.9652 3.34287 11.7869C3.18586 10.536 3.01894 9.09672 2.47561 7.88879C2.04286 6.92069 1.3405 6.11638 0.121712 5.80336C0.02676 5.77936 -0.0305999 5.68696 -0.010723 5.5936C0.0704346 5.21241 0.26614 4.29321 0.348555 3.90612C0.358532 3.85926 0.386543 3.81815 0.426675 3.79234C0.47049 3.76731 0.518447 3.75898 0.566081 3.77024C2.53918 4.24603 3.68204 5.49402 4.37695 7.03842C5.00017 8.43146 5.22917 10.0856 5.41068 11.5288C5.68305 13.7021 6.62199 15.3295 8.48152 15.7241C9.2106 15.8788 10.0424 15.7499 10.7275 15.2978C10.7987 15.2528 10.8247 15.1665 10.7986 15.09C10.4021 14.0062 7.63995 6.40874 7.23956 5.30673C7.20999 5.22872 7.24003 5.14176 7.30752 5.09592C8.23159 4.49751 14.2421 0.597538 15.2732 -0.0695726C15.3539 -0.123405 15.4644 -0.0999695 15.5199 -0.0172254C16.1864 1.00974 20.0959 7.01441 20.6961 7.93706C20.7428 8.00713 20.7312 8.098 20.676 8.15841C19.7834 9.07861 13.1546 15.9186 13.1546 15.9186C13.1539 15.9219 13.1493 15.9251 13.1449 15.9281C12.8779 16.2058 12.2375 16.8459 11.5732 17.2183Z"
              strokeWidth={0.5}
              stroke="#fff"
              style={{
                animationDelay: '0.25s',
              }}
              strokeDasharray={150}
              strokeDashoffset={150}
              className="animate-draw fill-transparent"
            />
          </svg>
        </div>

        <h1 className="mt-6 mb-3 text-center text-3xl font-bold">
          Next.js Starter
        </h1>

        <p className="mb-8 text-center text-sm text-white/70">
          Powered by{' '}
          <a
            href="https://aerolab.co"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition duration-300 ease-in-out hover:text-white"
          >
            Aerolab
          </a>
        </p>

        <div className="mt-5 space-y-5">
          <p className="text-center text-lg font-medium">
            Ready to start building?
          </p>

          <p className="mt-5 rounded-md bg-black p-2">
            Edit <code>src/app/page.tsx</code> and save to reload.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <a
            aria-label="clone in github"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Aerolab/next-starter/"
            className="flex items-center space-x-2 border-b border-white/70 pb-1 text-white/70 transition duration-300 ease-in-out hover:border-white hover:text-white"
          >
            <span>Clone in GitHub</span>
            <LuGithub className="size-5" />
          </a>
        </div>
      </div>
    </main>
  );
}
