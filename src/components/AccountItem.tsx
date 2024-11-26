"use client";

import { Account } from "@/app/types";
import lodash from "lodash";
import { ShareButton } from "./ShareButton";
import { Calendar } from "lucide-react";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { saveLocations } from "@/actions/save-locations";

interface Props {
  account: Account;
}
export function AccountItem({ account }: Props) {
  const params = useParams();
  const provider = params.slug?.[0];
  const criteria = params.slug?.[1] || "cc";
  const code = params.slug?.[2];

  const { addRecentSearch } = useRecentSearches();

  useEffect(() => {
    if (provider && criteria && code && account.address) {
      addRecentSearch({
        criteria,
        provider,
        code,
        address: account.address,
      });
    }
  }, [provider, criteria, code, account.address, addRecentSearch]);

  useEffect(() => {
    if (account.locations && provider && criteria && code) {
      saveLocations({
        name: account.address,
        locations: account.locations,
        provider,
        criteria,
        code,
      });
    }
  }, []);

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
    <div
      key={account.account}
      className="px-4 pt-0 md:pt-4 text-sm pb-4 border-b last-of-type:border-0"
    >
      <div className="md:flex md:justify-between md:items-center md:flex-row-reverse mb-4">
        <ShareButton />
        <div>
          <div className="text-lg leading-none">
            {account.address} ({account.seed})
          </div>
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
      {Object.keys(powercutsByDate).map((date, index) => {
        const hours = powercutsByDate[date];
        const today = index === 0;
        return (
          <div key={date} className="mb-2 last-of-type:mb-0">
            <div
              className={cn(
                `flex items-center font-semi`,
                today && "font-bold"
              )}
            >
              {today ? (
                <Badge
                  variant="default"
                  className={cn(
                    provider === "eeasa" && "bg-[#20305f] hover:bg-[#20305f]",
                    provider === "cnel" && "bg-[#32276c] hover:bg-[#32276c]"
                  )}
                >
                  <Calendar className="w-4 h-4 mr-1" /> {date}
                </Badge>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-1" />
                  {date}
                </>
              )}
            </div>
            <div className={cn("ml-5", today && "font-bold")}>
              {hours.map((hour) => (
                <div
                  className={cn(
                    "flex",
                    today && provider === "eeasa" && "text-[#20305f]",
                    today && provider === "cnel" && "text-[#32276c]"
                  )}
                  key={hour.date}
                >
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
