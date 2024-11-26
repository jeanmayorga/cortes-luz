import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function SearchRecentsSkeleton() {
  return (
    <div className="p-4 last-of-type:border-b-0 border-b">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm">Búsquedas recientes</div>
        <Button variant="link" size="sm" disabled className="py-0 h-auto">
          Eliminar
        </Button>
      </div>
      <div className="flex gap-4 overflow-auto">
        {[...Array(3).keys()].map((i) => (
          <div
            key={i}
            className="relative min-w-44 rounded-xl bg-gray-50/10 border border-gray-100 select-none p-3"
          >
            <Skeleton className="w-14 h-[12px] mb-1" />
            <Skeleton className="w-full h-[18px] mb-[2px]" />
            <Skeleton className="w-20 h-[12px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
