import { Button } from "@/components/ui/button";
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
          <Link href="/cnel" className="block mb-4">
            <Button variant="default">
              <ExternalLink /> Corporación Nacional de Electricidad (CNEL EP)
            </Button>
          </Link>
          <Link href="/eeasa" className="block">
            <Button variant="default">
              <ExternalLink /> Empresa Eléctrica Ambato Regional Centro Norte
              S.A. (EEASA)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
