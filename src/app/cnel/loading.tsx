import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

export default function Loading() {
  return (
    <div className="p-4 text-sm">
      <div className="flex justify-between items-center  mb-4">
        <div>
          <Skeleton className="w-[160px] h-[16px] rounded-full mb-[7px]" />

          <Skeleton className="w-[400px] h-[12px] rounded-full mb-[3px]" />
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-1">Lugares:</div>
        <Skeleton className="w-full block h-[14px] rounded-full mb-[7px]" />
        <Skeleton className="w-full block h-[14px] rounded-full mb-[7px]" />
        <Skeleton className="w-full block h-[14px] rounded-full mb-[7px]" />
      </div>
      <div className="font-semibold mb-[2px]">Horario:</div>
      <div className="mb-4">
        <div className="flex items-center font-semi mb-1">
          <Calendar className="w-4 h-4 mr-1" />
          <Skeleton className="w-[200px] block h-[14px] rounded-full" />
        </div>
        <div className="ml-5">
          <Skeleton className="w-[120px] block h-[14px] rounded-full mb-1" />
          <Skeleton className="w-[120px] block h-[14px] rounded-full" />
        </div>
      </div>
      <div>
        <div className="flex items-center font-semi mb-1">
          <Calendar className="w-4 h-4 mr-1" />
          <Skeleton className="w-[200px] block h-[14px] rounded-full" />
        </div>
        <div className="ml-5">
          <Skeleton className="w-[120px] block h-[14px] rounded-full mb-[5px]" />
          <Skeleton className="w-[120px] block h-[14px] rounded-full mb-[5px]" />
        </div>
      </div>
    </div>
  );
}
