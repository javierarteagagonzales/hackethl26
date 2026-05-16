import { Skeleton } from "@/components/ui/skeleton";

export function TeamSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 bg-white/5" />
          <Skeleton className="h-4 w-64 bg-white/5" />
        </div>
        <Skeleton className="h-6 w-24 bg-white/5" />
      </div>
      <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full bg-white/5" />
          <div className="space-y-1">
            <Skeleton className="h-2 w-12 bg-white/5" />
            <Skeleton className="h-4 w-32 bg-white/5" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-2 w-16 bg-white/5" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="p-3 rounded-lg border border-white/5 bg-white/2 flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full bg-white/5" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-24 bg-white/5" />
                <Skeleton className="h-2 w-32 bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48 bg-white/5" />
          <Skeleton className="h-4 w-64 bg-white/5" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 rounded-lg bg-white/5 border border-white/10" />
        ))}
      </div>
    </div>
  );
}

export function JudgeSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white/2 border border-white/8 rounded-xl overflow-hidden h-64 flex flex-col p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 bg-white/5" />
              <Skeleton className="h-3 w-24 bg-white/5" />
            </div>
            <Skeleton className="h-5 w-16 bg-white/5" />
          </div>
          <Skeleton className="h-3 w-full bg-white/5" />
          <Skeleton className="h-3 w-4/5 bg-white/5" />
          <div className="mt-auto pt-4 border-t border-white/5">
            <Skeleton className="h-9 w-full bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
