'use client';

import Button from '@/components/ui/Button';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="mb-10 flex flex-col items-center gap-6 text-center">
      <div>
        <h1 className="text-h2 md:text-h1-desktop bg-gradient-linear mb-2 bg-clip-text text-transparent">
          Something went wrong
        </h1>
        <p className="text-sm text-gray-500">
          We couldn&apos;t load this content. Please try again in a moment.
        </p>
      </div>
      <Button variant="primary" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
