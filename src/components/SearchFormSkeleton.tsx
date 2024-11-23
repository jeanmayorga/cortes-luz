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
import { Loader } from "lucide-react";

export function SearchFormSkeleton() {
  return (
    <div className="last-of-type:border-b-0 border-b">
      <Form action="/cnel" className="p-4 grid grid-cols-12 gap-2">
        <div className="col-span-4">
          <Select name="criteria" disabled>
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
          <Input placeholder="000000000000" name="code" disabled />
        </div>

        <Button type="submit" disabled className="col-span-2 rounded-xl">
          <Loader />
        </Button>
      </Form>
    </div>
  );
}
