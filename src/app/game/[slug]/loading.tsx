export default function GameDetailLoading() {
  return (
    <div className="mb-10 flex animate-pulse flex-col gap-6">
      {/* Header section */}
      <div className="flex gap-4">
        <div className="h-[226px] w-[170px] rounded-lg bg-gray-300" />
        <div className="flex-1">
          <div className="mb-2 h-8 w-3/4 rounded bg-gray-300" />
          <div className="h-6 w-1/2 rounded bg-gray-300" />
        </div>
      </div>

      {/* Collect button */}
      <div className="h-12 w-full rounded bg-gray-300" />

      {/* Chips section */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="h-8 w-20 rounded bg-gray-300" />
        <div className="h-8 w-24 rounded bg-gray-300" />
        <div className="h-8 w-28 rounded bg-gray-300" />
      </div>

      {/* Summary section */}
      <div>
        <div className="mb-2 h-7 w-20 rounded bg-gray-300" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-300" />
          <div className="h-4 w-full rounded bg-gray-300" />
          <div className="h-4 w-3/4 rounded bg-gray-300" />
        </div>
      </div>

      {/* Platforms section */}
      <div>
        <div className="mb-2 h-7 w-24 rounded bg-gray-300" />
        <div className="h-4 w-2/3 rounded bg-gray-300" />
      </div>

      {/* Media section */}
      <div>
        <div className="mb-2 h-7 w-16 rounded bg-gray-300" />
      </div>

      {/* Similar games section */}
      <div>
        <div className="mb-2 h-7 w-32 rounded bg-gray-300" />
        <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-lg bg-gray-300" />
          ))}
        </div>
      </div>
    </div>
  );
}
