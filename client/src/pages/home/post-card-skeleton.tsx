import { Skeleton } from "@/components/ui/skeleton";

interface PostCardSkeletonProps {
  variant?: "default" | "featured" | "compact";
}

export default function PostCardSkeleton({
  variant = "default",
}: PostCardSkeletonProps) {
  if (variant === "compact") {
    return (
      <div className="space-y-3">
        <Skeleton className="h-32 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-card border border-card-border rounded-xl overflow-hidden"
      data-testid="skeleton-post-card"
    >
      <Skeleton className="aspect-[3/2]" />
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}
