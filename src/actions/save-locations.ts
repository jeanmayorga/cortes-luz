"use server";

import { supabase } from "@/lib/supabase";

function createHash(name: string, locations: string) {
  const stringifyName = name
    .trim()
    .replace(" ", "")
    .replace(",", "")
    .replace(".", "")
    .replace("-", "")
    .replace("/", "")
    .toLowerCase();
  const locationsName = locations
    .trim()
    .replace(" ", "")
    .replace(",", "")
    .replace(".", "")
    .replace("-", "")
    .replace("/", "")
    .toLowerCase();

  return stringifyName + locationsName;
}

export interface LocationDTO {
  name: string;
  locations: string;
  provider: string;
  criteria: string;
  code: string;
}
export async function saveLocations({
  name,
  locations,
  provider,
  criteria,
  code,
}: LocationDTO) {
  const hash = createHash(name, locations);
  const { data } = await supabase
    .from("locations-powercuts")
    .select("*")
    .eq("hash", hash)
    .single();

  if (!data) {
    console.log(`saveLocations -> exists -> ${name}`);
    await supabase
      .from("locations-powercuts")
      .insert({ name, locations, provider, criteria, code, hash });
  }
}
