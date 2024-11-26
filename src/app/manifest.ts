import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Consulta los cortes del servicio eléctrico",
    short_name: "Cortes de luz",
    description:
      "Sistema de consulta de programación de suspensión de servicio eléctrico",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#32276c",
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
