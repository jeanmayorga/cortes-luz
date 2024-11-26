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
        <h1 className="sr-only">{provider}</h1>
        <Link href="/cnel" className={classNames}>
          <Image
            src="/banner.jpg"
            alt="Cnel banner"
            width="400"
            height="150"
            className="w-full h-full"
          />
        </Link>
      </div>
    );
  }

  if (provider === "eeasa") {
    return (
      <div className="p-4 border-b">
        <h1 className="sr-only">{provider}</h1>
        <Link href="/eeasa" className={classNames}>
          <Image
            src="/banner-eaasa.png"
            alt="Eeasa banner"
            width="400"
            height="150"
            className="w-full h-full"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 border-b">
      <h1 className="sr-only">{provider}</h1>
      <div className={classNames} />
    </div>
  );
}
