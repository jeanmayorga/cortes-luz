"use client";

import { ExternalLink } from "lucide-react";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}
export function ShareButton({ className }: Props) {
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
      className={cn("rounded-full", className)}
      size="sm"
      variant="outline"
      onClick={onShare}
    >
      <ExternalLink className="mr-1 h-6 w-4 text-muted-foreground" />
      Compartir
    </Button>
  );
}
