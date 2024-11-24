import { SearchForm } from "@/components/SearchForm";
import { SearchFormSkeleton } from "@/components/SearchFormSkeleton";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchRecents } from "@/components/SearchRecents";

interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <div className="md:w-[640px] w-full mx-auto mb-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="rounded-full">
            <List />
            Ver otros servicios eléctricos
          </Button>
        </Link>
      </div>
      <Link href="/cnel" className="w-full flex justify-center mb-4">
        <Image
          src="/banner.jpg"
          width={640}
          height={100}
          alt="Cnel banner"
          className="rounded-3xl"
        />
      </Link>
      <div className="md:w-[640px] w-full bg-white mx-auto border border-gray-200 shadow-sm rounded-3xl">
        <Suspense fallback={<SearchFormSkeleton />}>
          <SearchForm provider="cnel" />
        </Suspense>
        <SearchRecents />
        {children}
      </div>
    </>
  );
}
