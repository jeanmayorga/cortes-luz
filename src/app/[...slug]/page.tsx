import { Accounts } from "@/components/Accounts";
import { getAccounts } from "../config";

interface Params {
  slug: string[];
}
interface Props {
  params: Promise<Params>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [provider, criteria, code] = slug;

  const accounts = await getAccounts({ provider, criteria, code });

  return <Accounts accounts={accounts} />;
}
