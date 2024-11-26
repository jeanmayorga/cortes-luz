"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  criteria: z.string().min(2),
  code: z.string().min(2),
});

export function SearchFormByAccount() {
  const router = useRouter();
  const params = useParams();
  const provider = params.slug?.[0];
  const criteria = params.slug?.[1] || "cc";
  const code = params.slug?.[2];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      criteria,
      code,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    router.push(`/${provider}/${values.criteria}/${values.code}`);
  }

  return (
    <div className="last-of-type:border-b-0 border-b">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-4"
        >
          <div className="md:col-span-4 col-span-6">
            <FormField
              control={form.control}
              name="criteria"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      name="criteria"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Código" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cu">Codigo único (cuen)</SelectItem>
                        <SelectItem value="cc">Cuenta contrato</SelectItem>
                        <SelectItem value="ci">Número de cédula</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="md:col-span-6 col-span-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="000000000000" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            aria-label="buscar"
            className={cn(
              "md:col-span-2 col-span-12 rounded-xl",
              provider === "eeasa" && "bg-[#20305f] hover:bg-[#20305f]",
              provider === "cnel" && "bg-[#32276c] hover:bg-[#32276c]"
            )}
          >
            <Search />
            Buscar
          </Button>
        </form>
      </Form>
    </div>
  );
}
