import { Accounts } from "@/components/Accounts";
import { getAccounts } from "../config";
import { Metadata } from "next";

interface Params {
  slug: string[];
}
interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [provider, criteria, code] = slug;

  const accounts = await getAccounts({ provider, criteria, code });

  const account = accounts[0];

  if (account) {
    return {
      title: `${provider.toUpperCase()} | ${account.address.replace(
        "...",
        ""
      )} | Cortes del servicio eléctrico`,
      description: account.locations,
    };
  }

  return {
    title: "Consulta los cortes del servicio eléctrico.",
    description:
      "Sistema de consulta de programación de suspensión de servicio eléctrico",
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [provider, criteria, code] = slug;

  const accounts = await getAccounts({ provider, criteria, code });

  return <Accounts accounts={accounts} />;
}
