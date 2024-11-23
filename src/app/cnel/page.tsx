import { SearchForm } from "@/components/SearchForm";
import { Criteria, getCnelAccounts } from "./actions";
import { Results } from "@/components/Results";
import { Metadata } from "next";
import { Account } from "../types";

export const metadata: Metadata = {
  title: "Consulta los cortes del servicio eléctrico",
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

  let accounts: Account[] = [];
  if (criteria && code) {
    accounts = await getCnelAccounts({ criteria, code });
  }
  await new Promise((r) => setTimeout(r, 2000));

  return (
    <div className="py-48">
      <div className="text-center py-4">
        Consulta de suspensión de servicio eléctrico (CNEL)
      </div>
      <div className="w-[640px] bg-white mx-auto border border-gray-200 shadow-sm rounded-3xl">
        <SearchForm />
        {/* <SearchRecents /> */}
        <Results accounts={accounts} />
      </div>
    </div>
  );
}
