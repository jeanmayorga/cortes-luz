import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "600"],
});

export const metadata: Metadata = {
  title: "Consulta los cortes del servicio eléctrico",
  description:
    "Sistema de consulta de programación de suspensión de servicio eléctrico",
  robots: "index, follow",
  authors: [
    {
      name: "Jean Paul Mayorga",
      url: "https://jeanmayorga.com",
    },
  ],
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
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
