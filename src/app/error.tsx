"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="md:w-[640px] w-full bg-white mx-auto border border-gray-200 shadow-sm md:rounded-3xl overflow-hidden p-2 ">
      <div className="px-4 pt-4 pb-4 last-of-type:border-b-0 border-b">
        <div className="font-semibold mb-4">
          No encontramos la pagina que buscas, pero tenemos estas opciones
          disponibles:
        </div>
        <div>
          <Link href="/cnel" className="flex items-center mb-4 underline">
            <ExternalLink className="w-4 h-4 mr-2" /> Corporación Nacional de
            Electricidad (CNEL EP)
          </Link>
          <Link href="/eeasa" className="flex items-center underline">
            <ExternalLink className="w-4 h-4 mr-2" /> Empresa Eléctrica Ambato
            Regional Centro Norte S.A. (EEASA)
          </Link>
        </div>
      </div>
    </div>
  );
}
