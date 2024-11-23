import { SearchForm } from "@/components/SearchForm";
import { SearchFormSkeleton } from "@/components/SearchFormSkeleton";
import { Suspense } from "react";
import Image from "next/image";
import { SearchRecents } from "@/components/SearchRecents";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div className="md:py-48 py-8 md:px-0 px-4">
      <Link href="/cnel" className="w-full flex justify-center mb-8">
        <Image
          src="/banner.jpg"
          width={640}
          height={100}
          alt="Cnel banner"
          className="rounded-3xl"
        />
      </Link>
      <div className="text-center py-2">
        Consulta de suspensión de servicio eléctrico (CNEL)
      </div>
      <div className="md:w-[640px] w-full bg-white mx-auto border border-gray-200 shadow-sm rounded-3xl">
        <Suspense fallback={<SearchFormSkeleton />}>
          <SearchForm />
        </Suspense>
        <SearchRecents />

        {children}
      </div>
    </div>
  );
}
