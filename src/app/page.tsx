import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Consulta los cortes del servicio eléctrico",
  description:
    "Sistema de consulta de programación de suspensión de servicio eléctrico",
};

export default async function Home() {
  return (
    <div className="py-48 flex items-center justify-center">
      <Link href="/cnel">
        <Button variant="outline">
          Corporación Nacional de Electricidad (CNEL EP)
        </Button>
      </Link>
    </div>
  );
}
