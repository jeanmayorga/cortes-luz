import { Metadata } from "next";
import { Suspense } from "react";
import { AccountItem } from "@/components/AccountItem";
import { getDataFromShareableUuid } from "@/app/actions";
import { Criteria, getCnelAccounts } from "../cnel/actions";
import LoadingCnel from "../cnel/loading";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, List } from "lucide-react";
import { redirect } from "next/navigation";
import { Account } from "../types";
import { getEeasaAccounts } from "../eeasa/actions";

interface Params {
  uuid: string;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uuid } = await params;
  const data = await getDataFromShareableUuid(uuid);

  if (data) {
    let accounts: Account[] = [];
    if (data.provider === "cnel") {
      accounts = await getCnelAccounts({
        criteria: data.criteria,
        code: data.code,
      });
    }
    if (data.provider === "eeasa") {
      accounts = await getEeasaAccounts({
        criteria: data.criteria,
        code: data.code,
      });
    }
    const account = accounts[0];
    return {
      title: `Cortes en ${
        account.address
      }  del servicio eléctrico ${data.provider.toUpperCase()}`,
      description: `Cortes del servicio eléctrico: ${account.locations}`,
    };
  }

  return {
    title: "Consulta los cortes del servicio eléctrico.",
    description:
      "Sistema de consulta de programación de suspensión de servicio eléctrico",
  };
}
export default async function Page({ params }: Props) {
  const { uuid } = await params;
  const data = await getDataFromShareableUuid(uuid);

  if (!data) return redirect("/");
  const key = `${data.criteria}${data.code}`;

  return (
    <>
      <div className="md:w-[640px] w-full mx-auto mb-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="rounded-full">
            <List />
            Ver otros servicios eléctricos
          </Button>
        </Link>
      </div>
      {/* {data.provider === "cnel" && (
        <div className="text-center py-2">
          Consulta de suspensión de servicio eléctrico (CNEL)
        </div>
      )} */}
      {data.provider === "cnel" && (
        <Link href="/cnel" className="w-full flex justify-center mb-4">
          <Image
            src="/banner.jpg"
            width={640}
            height={100}
            alt="Cnel banner"
            className="rounded-3xl"
          />
        </Link>
      )}
      {data.provider === "eeasa" && (
        <Link href="/eeasa" className="w-full flex justify-center mb-4">
          <Image
            src="/banner-eaasa.png"
            width={640}
            height={100}
            alt="Cnel banner"
            className="rounded-3xl"
          />
        </Link>
      )}
      <div className="md:w-[640px] w-full bg-white mx-auto border border-gray-200 shadow-sm rounded-3xl">
        <div className="p-4 border-b-0 md:border-b border-dashed md:py-2:">
          <Link href={`/${data.provider}`}>
            <Button className="rounded-full w-full md:w-auto" variant="outline">
              <ArrowLeft />
              Consultar mi corte de luz
            </Button>
          </Link>
        </div>
        <Suspense key={key} fallback={<LoadingCnel />}>
          <Accounts
            code={data.code}
            criteria={data.criteria}
            provider={data.provider}
          />
        </Suspense>
      </div>
    </>
  );
}

async function Accounts({
  criteria,
  code,
  provider,
}: {
  criteria: Criteria;
  code: string;
  provider: string;
}) {
  let accounts: Account[] = [];
  if (provider === "cnel") {
    accounts = await getCnelAccounts({
      criteria,
      code,
    });
  }
  if (provider === "eeasa") {
    accounts = await getEeasaAccounts({
      criteria,
      code,
    });
  }

  return (
    <>
      {accounts.map((account) => (
        <AccountItem
          key={account.account}
          account={account}
          provider={provider}
        />
      ))}
    </>
  );
}
