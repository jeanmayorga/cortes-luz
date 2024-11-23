import { supabase } from "@/utils/supabase";
import { Criteria } from "./cnel/actions";

interface Options {
  provider?: string;
  criteria?: string;
  code?: string;
}

export async function getShareableUuid({ provider, criteria, code }: Options) {
  const { data, error } = await supabase
    .from("cortes-shareable-links")
    .upsert(
      { hash: `${provider}${criteria}${code}`, provider, criteria, code },
      {
        ignoreDuplicates: false,
        onConflict: "hash",
      }
    )
    .select()
    .single();

  if (error) {
    throw new Error(error.details);
  }

  return data.id;
}

export async function getDataFromShareableUuid(uuid: string) {
  const { data, error } = await supabase
    .from("cortes-shareable-links")
    .select("*")
    .eq("id", uuid)
    .single();

  if (error) {
    return null;
  }

  interface Response {
    id: string;
    provider: string;
    created_at: string;
    criteria: Criteria;
    code: string;
    hash: string;
  }

  return data as Response;
}
