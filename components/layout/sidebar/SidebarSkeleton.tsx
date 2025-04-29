// /components/layout/sidebar/SidebarSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { SidebarSkeletonProps } from './types';
import { cn } from '@/lib/utils';

/**
 * Skeleton loading state for the sidebar
 */
export function SidebarSkeleton({ className }: SidebarSkeletonProps) {
  return (
    <aside className={cn("h-screen w-60 bg-none border-r border-gray-200 dark:border-gray-800 flex flex-col", className)}>
      {/* Header skeleton */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <Skeleton className="h-9 w-9 rounded-md" />
        <div className="space-y-1 flex-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3.5 w-32" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-2 flex-1 overflow-hidden">
        <div className="px-2 py-1.5">
          <Skeleton className="h-4 w-24 mb-2" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="mb-2">
              <Skeleton className="h-9 w-full rounded-md mb-1" />
              {i === 1 && (
                <div className="ml-8 space-y-1">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-7 w-full rounded-md" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer skeleton */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </aside>
  );
}