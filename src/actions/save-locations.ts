import { supabase } from "@/lib/supabase";

interface Options {
  locations: string;
  provider: string;
  criteria: string;
  code: string;
}
export async function saveLocations({
  locations,
  provider,
  criteria,
  code,
}: Options) {
  await supabase.from("locations-powercuts").upsert(
    { locations, provider, criteria, code },
    {
      ignoreDuplicates: false,
      onConflict: "locations",
    }
  );
}
