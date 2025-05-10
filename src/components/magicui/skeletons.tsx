import { Skeleton } from "../ui/skeleton";

export const ProjectsLoading = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="mb-12">
      <Skeleton className="h-12 w-48 mb-4" />
      <Skeleton className="h-6 w-full max-w-2xl" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <Skeleton className="h-48 w-full" />
          <div className="p-6 space-y-4">
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex flex-wrap gap-2 mt-4">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AboutLoading = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="mb-12">
      <Skeleton className="h-12 w-48 mb-4" />
      <Skeleton className="h-6 w-full max-w-2xl" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2].map((i) => (
        <div key={i} className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 p-6">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  </div>
);
