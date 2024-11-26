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
  await supabase
    .from("locations-powercuts")
    .upsert(
      { name, locations, provider, criteria, code, hash },
      {
        ignoreDuplicates: false,
        onConflict: "hash",
      }
    )
    .select("*");
}
