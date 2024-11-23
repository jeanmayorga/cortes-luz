import { Account } from "@/app/types";
import lodash from "lodash";
import { ShareButton } from "./ShareButton";
import { Calendar } from "lucide-react";

interface AccountItemProps {
  account: Account;
}
async function AccountItem({ account }: AccountItemProps) {
  const powercutsByDate = lodash.groupBy(
    account.powercuts,
    (powercut) => powercut.dateString
  );

  return (
    <div key={account.account} className="p-4 text-sm">
      <div className="flex justify-between items-center  mb-4">
        <div>
          <div className="text-lg leading-none">{account.address}</div>
          <div className="text-sm text-gray-500">
            Actualizado el{" "}
            {new Intl.DateTimeFormat("es-EC", {
              dateStyle: "full",
              timeStyle: "long",
            }).format(new Date(account.registeredAt))}
          </div>
        </div>
        <ShareButton />
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

interface Props {
  accounts: Account[];
}
export function Results({ accounts }: Props) {
  if (accounts.length === 0) return null;

  return (
    <div>
      {accounts.map((account) => (
        <AccountItem key={account.account} account={account} />
      ))}
    </div>
  );
}
