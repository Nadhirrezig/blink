export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-[#1D1721] text-white">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 bg-[#1D1721]/95 backdrop-blur-sm border-b border-[#EEA4CE]/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-6 w-32 bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] rounded animate-pulse" />
              <div className="h-3 w-20 bg-gray-600 rounded mt-1 animate-pulse" />
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      {/* Search and Filter Skeleton */}
      <div className="px-4 py-3 bg-[#1D1721] border-b border-[#EEA4CE]/20">
        <div className="h-10 bg-[#F7F8FB] rounded-lg mb-3 animate-pulse" />
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-20 bg-[#F7F8FB] rounded-full animate-pulse flex-shrink-0" />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-4 h-4 bg-gray-600 rounded animate-pulse" />
          <div className="h-6 w-24 bg-[#F7F8FB] rounded animate-pulse" />
        </div>
      </div>

      {/* Menu Items Grid Skeleton */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-[#F7F8FB] rounded-xl p-4 animate-pulse">
              <div className="relative mb-3">
                <div className="w-full h-32 bg-gradient-to-br from-[#EEA4CE]/20 to-[#BBEED1]/20 rounded-lg" />
                <div className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full" />
                <div className="absolute bottom-2 left-2 w-12 h-5 bg-white/90 rounded-full" />
              </div>
              <div className="mb-3">
                <div className="h-5 w-24 bg-gray-300 rounded mb-2" />
                <div className="h-4 w-full bg-gray-300 rounded" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-6 w-16 bg-[#EEA4CE] rounded" />
                <div className="h-8 w-24 bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 