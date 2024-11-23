"use client";

import Form from "next/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Loader, Search } from "lucide-react";

function Submit() {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={status.pending}
      className="col-span-2 rounded-xl"
    >
      {status.pending ? <Loader /> : <Search />}
      {status.pending ? "" : "Buscar"}
    </Button>
  );
}

export function SearchForm() {
  const searchParams = useSearchParams();

  const criteria = searchParams.get("criteria") || "CUEN";
  const code = searchParams.get("code") || undefined;

  return (
    <div className="last-of-type:border-b-0 border-b">
      <Form action="/cnel" className="p-4 grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <Select name="criteria" required defaultValue={criteria}>
            <SelectTrigger>
              <SelectValue placeholder="Código" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CUEN">Codigo único (cuen)</SelectItem>
              <SelectItem value="CUENTA_CONTRATO">Cuenta contrato</SelectItem>
              <SelectItem value="IDENTIFICACION">
                Número de identificación
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-6">
          <Input
            placeholder="000000000000"
            defaultValue={code}
            name="code"
            required
            type="number"
          />
        </div>

        <Submit />
      </Form>
    </div>
  );
}
