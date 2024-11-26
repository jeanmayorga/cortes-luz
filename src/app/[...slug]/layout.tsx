import Link from "next/link";
import { List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchRecents } from "@/components/SearchRecents";
import { isValidCriteria, isValidProvider } from "../config";
import { redirect } from "next/navigation";
import { SearchBanner } from "@/components/SearchBanner";
import { SearchTabs } from "@/components/SearchTabs";

interface Params {
  slug: string[];
}
interface Props {
  params: Promise<Params>;
  children: React.ReactNode;
}
export default async function Layout({ children, params }: Props) {
  const { slug } = await params;
  const [provider, criteria] = slug;

  if (!isValidProvider(provider)) {
    return redirect("/");
  }
  if (criteria && !isValidCriteria(criteria)) {
    return redirect(`/${provider}`);
  }

  return (
    <>
      <div className="md:w-[640px] w-full mx-auto mb-4">
        <Link href="/" className="ml-4 md:ml-0">
          <Button variant="outline" className="rounded-xl">
            <List />
            Ver otros servicios eléctricos
          </Button>
        </Link>
      </div>
      <div className="md:w-[640px] w-full bg-white mx-auto border border-gray-200 shadow-sm md:rounded-3xl">
        <SearchBanner />
        <SearchTabs />
        <SearchRecents />

        {children}
      </div>
    </>
  );
}
