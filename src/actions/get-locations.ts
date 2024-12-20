"use server";
import { supabase } from "@/lib/supabase";

export interface Location {
  id: string;
  name: string;
  locations: string;
  provider: string;
  criteria: string;
  code: string;
  hash: string;
}

interface Options {
  query: string;
}
export async function getLocations({ query }: Options) {
  const { data, error } = await supabase
    .from("locations-powercuts")
    .select("*")
    .ilike("hash", `%${query}%`)
    .limit(4);

  if (error || !data) return [];

  console.log(`getLocations -> ${query} -> ${data.length}`);

  return data as unknown as Location[];
}
