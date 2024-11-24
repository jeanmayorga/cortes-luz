import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function Home() {
  return (
    <div className="flex items-center justify-center">
      <div>
        <div className="font-semibold mb-4">
          Tenemos estas opciones disponibles:
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
