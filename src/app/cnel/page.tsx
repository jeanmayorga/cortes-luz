import { Metadata } from "next";
import { Criteria, getCnelAccounts } from "./actions";
import { Suspense } from "react";
import Loading from "./loading";
import { AccountItem } from "@/components/AccountItem";

export const metadata: Metadata = {
  title: "Consulta los cortes del servicio eléctrico CNEL",
  description:
    "Sistema de consulta de programación de suspensión de servicio eléctrico",
};

interface SearchParams {
  criteria: Criteria;
  code: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}
export default async function Home({ searchParams }: Props) {
  const { criteria, code } = await searchParams;
  const key = `${criteria}${code}`;

  return (
    <Suspense key={key} fallback={<Loading />}>
      <Accounts code={code} criteria={criteria} />
    </Suspense>
  );
}

async function Accounts({ criteria, code }: SearchParams) {
  const accounts = await getCnelAccounts({ criteria, code });

  return (
    <>
      {accounts.map((account) => (
        <AccountItem key={account.account} account={account} provider="cnel" />
      ))}
    </>
  );
}
