"use client";

import { Account } from "@/app/types";
import lodash from "lodash";
import { ShareButton } from "./ShareButton";
import { Calendar } from "lucide-react";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  account: Account;
}
export function AccountItem({ account }: Props) {
  const searchParams = useSearchParams();
  const { addRecentSearch } = useRecentSearches();

  const criteria = searchParams.get("criteria") || "CUENTA_CONTRATO";
  const code = searchParams.get("code") || "";

  useEffect(() => {
    if (account.address && criteria && code) {
      addRecentSearch({
        criteria,
        code,
        address: account.address,
      });
    }
  }, [account.address, criteria, code, addRecentSearch]);

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
    <div key={account.account} className="p-4 text-sm">
      <div className="md:flex md:justify-between md:items-center md:flex-row-reverse mb-4">
        <ShareButton className="w-full md:w-auto mb-4 md:mb-0" />
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
