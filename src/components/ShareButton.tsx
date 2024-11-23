"use client";

import { ShareIcon } from "lucide-react";

import { Button } from "./ui/button";

export function ShareButton() {
  async function onShare() {
    const url = window.location.href;

    try {
      await navigator.share({ url });
      console.log("Shared!!");
    } catch (err) {
      console.log("Not Shared!!", err);
    }
  }

  return (
    <Button
      className="rounded-full"
      size="sm"
      variant="outline"
      onClick={onShare}
    >
      <ShareIcon className="mr-1 h-6 w-4 text-muted-foreground" />
      Compartir
    </Button>
  );
}
