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
    .ilike("hash", `%${query}%`);

  if (error || !data) return [];

  return data as unknown as Location[];
}
