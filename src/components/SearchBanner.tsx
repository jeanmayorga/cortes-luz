"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export function SearchBanner() {
  const params = useParams();
  const provider = params.slug?.[0];

  const classNames =
    "w-full h-16 xs md:h-20 block relative overflow-hidden bg-gray-100 rounded-2xl";

  if (provider === "cnel") {
    return (
      <div className="p-4 border-b">
        <Link href="/cnel" className={classNames}>
          <Image src="/banner.jpg" fill alt="Cnel banner" />
        </Link>
      </div>
    );
  }

  if (provider === "eeasa") {
    return (
      <div className="p-4 border-b">
        <Link href="/eeasa" className={classNames}>
          <Image src="/banner-eaasa.png" fill alt="Eeasa banner" />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 border-b">
      <div className={classNames} />
    </div>
  );
}
