"use client";

import { ExternalLink, Loader } from "lucide-react";

import { Button } from "./ui/button";
import { useState } from "react";

export function ShareButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onShare() {
    setIsLoading(true);
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      await navigator.share({ url });
    } catch (err) {
      console.log("Not Shared!!", err);
    }

    setIsLoading(false);
  }

  return (
    <Button
      className="rounded-xl w-full md:w-auto my-4 md:my-0"
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
          <ExternalLink className="h-4 w-4" />
          Compartir
        </>
      )}
    </Button>
  );
}
