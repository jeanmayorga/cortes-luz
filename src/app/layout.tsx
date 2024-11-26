import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "600"],
});

export const metadata: Metadata = {
  title: "Consulta los cortes del servicio eléctrico",
  description:
    "Consulta fácilmente la programación de suspensión del servicio eléctrico en tu área. Obtén información actualizada, fechas y horarios para estar preparado. ¡Accede ahora y planifica mejor tus actividades!",
  keywords:
    "Programación de suspensión eléctrica, Consulta de servicio eléctrico, Cortes de energía programados, Suspensión de electricidad, Horarios de cortes de luz, Fechas de suspensión de servicio eléctrico, Consulta de programación eléctrica, Cortes programados de luz, Información sobre cortes eléctricos, Sistema de consulta eléctrica, Servicio eléctrico en mi área, Programación de interrupción eléctrica, Planificación de cortes de luz, Fechas y horarios de cortes de electricidad, Consulta en línea de cortes eléctricos, Suspensión del servicio energético, Cortes eléctricos programados por región, Consulta de apagones, Avisos de cortes eléctricos, Interrupciones eléctricas planificadas, ¿Cuándo se suspenderá el servicio eléctrico?, Cortes programados de electricidad hoy, Cómo consultar cortes de luz, Fechas de interrupciones eléctricas en mi zona, Planificación de cortes de energía",
  robots: "index, follow",
  openGraph: {
    images: [
      {
        url: "https://www.cnelep.gob.ec/wp-content/uploads/2024/08/cortes_energia_compartir.jpg",
        width: 300,
        height: 300,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster containerClassName=" text-sm" />
        <div className="md:pt-24 py-8 px-0">{children}</div>
      </body>
      <GoogleAnalytics gaId="AW-728848373" />
      <GoogleTagManager gtmId="AW-728848373" />
    </html>
  );
}
