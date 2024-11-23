import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, List } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div className="md:w-[640px] w-full mx-auto mb-4">
        <Button variant="outline" size="sm" className="rounded-full" disabled>
          <List />
          Ver otros servicios eléctricos
        </Button>
      </div>

      <Skeleton className="md:w-[640px] mx-auto w-full flex justify-center mb-4 rounded-3xl md:h-[84.4px] h-[52.48px]" />

      <div className="md:w-[640px] w-full bg-white mx-auto border border-gray-200 shadow-sm rounded-3xl overflow-hidden">
        <div className="p-4 border-b-0 md:border-b border-dashed md:py-2:">
          <Button
            className="rounded-full w-full md:w-auto"
            variant="outline"
            disabled
          >
            <ArrowLeft />
            Consultar mi corte de luz
          </Button>
        </div>
        <div className="p-4 text-sm">
          <div className="flex justify-between items-center  mb-4">
            <div>
              <Skeleton className="w-[160px] h-[16px] rounded-full mb-[7px]" />

              <Skeleton className="w-[300px] h-[12px] rounded-full mb-[3px]" />
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
      </div>
    </>
  );
}
