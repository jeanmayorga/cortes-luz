"use client";

import { Account } from "@/app/types";
import { AccountItem } from "./AccountItem";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

interface Props {
  accounts: Account[];
}
export function Accounts({ accounts }: Props) {
  const params = useParams();
  const provider = params.slug?.[0];
  const criteria = params.slug?.[1] || "cc";
  const code = params.slug?.[2];

  useEffect(() => {
    if (accounts.length === 0 && provider && criteria && code) {
      toast.error("No encontramos información de cortes.");
    }
  }, [accounts.length, provider, criteria, code]);

  return (
    <>
      {accounts.map((account) => (
        <AccountItem key={account.account} account={account} />
      ))}
    </>
  );
}
