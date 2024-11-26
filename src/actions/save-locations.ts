import { supabase } from "@/lib/supabase";

interface Options {
  name: string;
  locations: string;
  provider: string;
  criteria: string;
  code: string;
  seed?: string;
}
export async function saveLocations({
  name,
  locations,
  provider,
  criteria,
  code,
  seed,
}: Options) {
  const { error } = await supabase.from("locations-powercuts").upsert(
    { name, locations, provider, criteria, code, seed },
    {
      ignoreDuplicates: false,
      onConflict: "locations",
    }
  );

  if (error) {
    throw new Error(error.details);
  }
}
