import { getCnelAccounts } from "@/actions/get-cnel-accounts";
import { getEeasaAccounts } from "@/actions/get-eeasa-accounts";
import { Account, GetAccountOptions } from "./types";

export const providers = ["cnel", "eeasa"];
export const criterias = ["cc", "ci", "cu"];

export const isValidProvider = (value: string) => {
  return providers.includes(value);
};

export const isValidCriteria = (value: string) => {
  return criterias.includes(value);
};

export async function getAccounts({
  provider,
  code,
  criteria,
}: GetAccountOptions): Promise<Account[]> {
  if (!criteria || !code) return [];

  if (provider === "cnel") {
    return getCnelAccounts({ code, criteria });
  }
  if (provider === "eeasa") {
    return getEeasaAccounts({ code, criteria });
  }

  return [];
}
