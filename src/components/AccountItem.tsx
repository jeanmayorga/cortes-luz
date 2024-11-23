"use client";

import { Account } from "@/app/types";
import lodash from "lodash";
import { ShareButton } from "./ShareButton";
import { Calendar } from "lucide-react";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  account: Account;
  provider: string;
}
export function AccountItem({ account, provider }: Props) {
  const searchParams = useSearchParams();
  const params = useParams();
  const { addRecentSearch } = useRecentSearches();

  const uuid = params.uuid as string;
  const criteria = searchParams.get("criteria") || "CUENTA_CONTRATO";
  const code = searchParams.get("code") || "";

  useEffect(() => {
    if (uuid) {
      addRecentSearch({
        provider,
        uuid,
        address: account.address,
      });
    } else if (account.address && criteria && code) {
      addRecentSearch({
        criteria,
        code,
        provider,
        address: account.address,
      });
    }
  }, [uuid, provider, criteria, code, account.address, addRecentSearch]);

  if (!account) return null;

  const powercutsByDate = lodash.groupBy(
    account.powercuts,
    (powercut) => powercut.dateString
  );

  const powercuts = account.powercuts;
  const lastPowercut = powercuts?.[powercuts.length - 1];
  const lastPowercutRegisteredAt =
    lastPowercut?.registeredAt || new Date().toISOString();

  return (
    <div key={account.account} className="px-4 pt-0 md:pt-4 text-sm pb-4">
      <div className="md:flex md:justify-between md:items-center md:flex-row-reverse mb-4">
        <ShareButton
          className="w-full md:w-auto mb-4 md:mb-0"
          provider="cnel"
          code={code}
          criteria={criteria}
        />
        <div>
          <div className="text-lg leading-none">{account.address}</div>
          <div className="text-sm text-gray-500">
            Actualizado el{" "}
            {format(lastPowercutRegisteredAt, "EEEE dd/MM/yyyy, hh:mm:ss a", {
              locale: es,
            })}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold">Lugares:</div>
        {account.locations}
      </div>
      <div className="font-semibold">Horario:</div>
      {Object.keys(powercutsByDate).map((date) => {
        const hours = powercutsByDate[date];
        return (
          <div key={date} className="mb-2 last-of-type:mb-0">
            <div className="flex items-center font-semi">
              <Calendar className="w-4 h-4 mr-1" />
              {date}
            </div>
            <div className="ml-5">
              {hours.map((hour) => (
                <div className="flex" key={hour.date}>
                  <div className="w-16">de {hour.startTime}</div>
                  <div>a</div>
                  <div className="ml-2">{hour.endTime}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
