"use client";

import { ExternalLink, Loader } from "lucide-react";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { getShareableUuid } from "@/app/actions";
import { useState } from "react";

interface Props {
  className?: string;
  provider?: string;
  criteria?: string;
  code?: string;
}
export function ShareButton({ className, provider, criteria, code }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onShare() {
    setIsLoading(true);
    try {
      const uuid = await getShareableUuid({
        provider,
        criteria,
        code,
      });

      const url = `https://www.cortesdeluz.com/${uuid}`;
      await navigator.share({ url });
      console.log("Shared!!");
    } catch (err) {
      console.log("Not Shared!!", err);
    }

    setIsLoading(false);
  }

  return (
    <Button
      className={cn("rounded-full", className)}
      size="sm"
      variant="outline"
      onClick={onShare}
    >
      {isLoading ? (
        <>
          <Loader /> Compartiendo...
        </>
      ) : (
        <>
          <ExternalLink className="mr-1 h-6 w-4 text-muted-foreground" />
          Compartir
        </>
      )}
    </Button>
  );
}
