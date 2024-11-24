"use server";

import { format, toZonedTime } from "date-fns-tz";
import { Account } from "../types";
import { es } from "date-fns/locale";

export type Criteria = "CUEN" | "CUENTA_CONTRATO" | "IDENTIFICACION";

interface EEASAItem {
  canton: string;
  cedula: string;
  celular: string;
  codAlim: string;
  cuen: string;
  cuentaContrato: string;
  direccion: string;
  fechaFinSusp: string;
  fechaIniSusp: string;
  item: number;
  mru: string;
  nomAlim: string;
  nombre: string;
  parroquia: string;
  provincia: string;
}

interface Options {
  criteria: Criteria | null;
  code: string | null;
}

const eeasaApi = `https://servicios.eeasa.com.ec/mieeasa/servicios/sap/consultaSuspension`;

export async function getEeasaAccounts({ criteria, code }: Options) {
  if (!criteria || !code) return [];

  console.log(`request to api EEASA -> ${code}/${criteria}`);

  const type = criteria === "IDENTIFICACION" ? "I" : "C";
  const url = `${eeasaApi}/?parametro=${code}&tipo=${type}`;
  const request = await fetch(url, {
    headers: {
      token: "TWlFZUFzQV86TUllZWFzYS4yMDIxXy4h",
    },
    // cache: "force-cache",
    // next: {
    //   revalidate: 60,
    // },
  });
  const response = (await request.json()) as EEASAItem[];

  if (response[0].cuen === "false") return [];
  if (response === null) return [];

  const mapped: Account[] = [
    {
      seed: response[0].codAlim,
      account: response[0].cuen,
      contractAccount: response[0].cuentaContrato,
      address: response[0].nomAlim,
      locations: `${response[0].direccion} ${response[0].nomAlim}`,
      registeredAt: new Date().toISOString(),
      powercuts: response.map((powercut) => {
        const start = toZonedTime(
          new Date(powercut.fechaIniSusp),
          "America/Guayaquil"
        );
        const end = toZonedTime(
          new Date(powercut.fechaFinSusp),
          "America/Guayaquil"
        );

        return {
          seed: powercut.codAlim,
          date: start.toISOString(),
          dateString: format(start, "eeee, dd 'de' MMMM 'de' yyyy", {
            locale: es,
          }),
          startTime: format(start, "HH:mm"),
          endTime: format(end, "HH:mm"),
          registeredAt: new Date().toISOString(),
        };
      }),
    },
  ];

  console.log(`request to api EEASA -> ${mapped.length} accounts found.`);

  return mapped;
}
