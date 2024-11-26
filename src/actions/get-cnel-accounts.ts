"use server";

import { Account } from "@/app/types";

export type CNELCriteria = "CUEN" | "CUENTA_CONTRATO" | "IDENTIFICACION";

const criteriaMap: Record<string, CNELCriteria> = {
  ci: "IDENTIFICACION",
  cc: "CUENTA_CONTRATO",
  cu: "CUEN",
};

export interface CNELResponse {
  resp: "ERROR" | "OK";
  mensaje: string | null;
  mensajeError: string | null;
  extra: null;
  notificaciones: {
    idUnidadNegocios: number;
    cuentaContrato: string;
    alimentador: string;
    cuen: string;
    direccion: string;
    fechaRegistro: string;
    detallePlanificacion: {
      alimentador: string;
      fechaCorte: string;
      horaDesde: string;
      horaHasta: string;
      comentario: string;
      fechaRegistro: string;
      fechaHoraCorte: string;
    }[];
  }[];
}

const cnelApi = `https://api.cnelep.gob.ec/servicios-linea/v1/notificaciones`;

export async function getCnelLocations(seed: string) {
  const request = await fetch(`${cnelApi}/sector/${seed}`, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
    },
  });
  const response = await request.text();

  return response;
}

interface Options {
  criteria: string | null | undefined;
  code: string | null | undefined;
}
export async function getCnelAccounts({ criteria, code }: Options) {
  if (!criteria || !code) return [];

  const request = await fetch(
    `${cnelApi}/consultar/${code}/${criteriaMap[criteria]}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    }
  );
  const response = (await request.json()) as CNELResponse;

  if (response.notificaciones === null) return [];

  const mapped: Account[] = [];

  for (const notification of response.notificaciones) {
    const powercuts = notification.detallePlanificacion.map((dp) => ({
      seed: dp.alimentador,
      date: dp.fechaHoraCorte,
      dateString: dp.fechaCorte,
      startTime: dp.horaDesde,
      endTime: dp.horaHasta,
      registeredAt: dp.fechaRegistro,
    }));

    const locations = await getCnelLocations(notification.alimentador);

    mapped.push({
      seed: notification.alimentador,
      account: notification.cuen,
      contractAccount: notification.cuentaContrato,
      address: notification.direccion,
      locations,
      registeredAt: notification.fechaRegistro,
      powercuts,
    });
  }

  console.log(
    `request to api cnel/${criteria}/${code} -> ${mapped.length}a ${mapped[0].powercuts.length}p`
  );

  return mapped;
}
