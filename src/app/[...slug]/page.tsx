import { Accounts } from "@/components/Accounts";
import { getAccounts, providers } from "../config";
import { Metadata } from "next";

interface Params {
  slug: string[];
}
interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [provider, criteria, code] = slug;

  const accounts = await getAccounts({ provider, criteria, code });
  const account = accounts[0];

  const keywords =
    "Programación de suspensión eléctrica, Consulta de servicio eléctrico, Cortes de energía programados, Suspensión de electricidad, Horarios de cortes de luz, Fechas de suspensión de servicio eléctrico, Consulta de programación eléctrica, Cortes programados de luz, Información sobre cortes eléctricos, Sistema de consulta eléctrica, Servicio eléctrico en mi área, Programación de interrupción eléctrica, Planificación de cortes de luz, Fechas y horarios de cortes de electricidad, Consulta en línea de cortes eléctricos, Suspensión del servicio energético, Cortes eléctricos programados por región, Consulta de apagones, Avisos de cortes eléctricos, Interrupciones eléctricas planificadas, ¿Cuándo se suspenderá el servicio eléctrico?, Cortes programados de electricidad hoy, Cómo consultar cortes de luz, Fechas de interrupciones eléctricas en mi zona, Planificación de cortes de energía";

  if (account) {
    const title = account.address.replace("...", "");

    const images = [
      {
        url: `https://www.cortesdeluz.com/og-image?title=${title}`,
        width: 630,
        height: 630,
        alt: title,
      },
    ];

    return {
      title: `${provider.toUpperCase()} | ${account.address.replace(
        "...",
        ""
      )} | Cortes del servicio eléctrico`,
      description: account.locations,
      keywords,
      robots: "index, follow",
      openGraph: {
        images,
        type: "website",
      },
    };
  }

  if (provider) {
    const images = [
      {
        url: `https://www.cortesdeluz.com/og-image?title=${provider}`,
        width: 630,
        height: 630,
        alt: provider,
      },
    ];
    return {
      title: `${provider.toUpperCase()} | Consulta los cortes del servicio eléctrico.`,
      description:
        "Consulta fácilmente la programación de suspensión del servicio eléctrico en tu área. Obtén información actualizada, fechas y horarios para estar preparado. ¡Accede ahora y planifica mejor tus actividades!",

      keywords,
      robots: "index, follow",
      openGraph: {
        images,
        type: "website",
      },
    };
  }

  return {
    title: "Consulta los cortes del servicio eléctrico.",
    keywords,
    description:
      "Consulta fácilmente la programación de suspensión del servicio eléctrico en tu área. Obtén información actualizada, fechas y horarios para estar preparado. ¡Accede ahora y planifica mejor tus actividades!",
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return providers.map((provider) => ({
    slug: [provider],
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [provider, criteria, code] = slug;

  const accounts = await getAccounts({ provider, criteria, code });

  return <Accounts accounts={accounts} />;
}
