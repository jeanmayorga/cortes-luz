import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function Home() {
  return (
    <div className="py-48 flex items-center justify-center">
      <div>
        <div className="font-semibold mb-4">
          Tenemos estas opciones disponibles:
        </div>
        <Link href="/cnel">
          <Button variant="default">
            <ExternalLink /> Corporación Nacional de Electricidad (CNEL EP)
          </Button>
        </Link>
      </div>
    </div>
  );
}
