import { SearchForm } from "@/components/SearchForm";
import { SearchFormSkeleton } from "@/components/SearchFormSkeleton";
import { Suspense } from "react";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div className="py-48">
      <div className="w-full flex justify-center mb-8">
        <Image
          src="/banner.jpg"
          width={640}
          height={100}
          alt="Cnel banner"
          className="rounded-3xl"
        />
      </div>
      <div className="text-center py-2">
        Consulta de suspensión de servicio eléctrico (CNEL)
      </div>
      <div className="w-[640px] bg-white mx-auto border border-gray-200 shadow-sm rounded-3xl">
        <Suspense fallback={<SearchFormSkeleton />}>
          <SearchForm />
        </Suspense>
        {/* <SearchRecents /> */}

        {children}
      </div>
    </div>
  );
}
