import { Skeleton } from '@/components/ui/skeleton';

export default function UmkmPageSkeleton() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Skeleton className="h-56 md:h-80 w-full rounded-none" />
      <div className="container mx-auto px-4">
        <div className="flex gap-4 -mt-16 mb-8">
          <Skeleton className="w-28 h-28 rounded-2xl shrink-0" />
          <div className="flex-1 pt-16 space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-16">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}