import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Consulta los cortes del servicio eléctrico",
    short_name: "Cortes de luz",
    description:
      "Consulta fácilmente la programación de suspensión del servicio eléctrico en tu área. Obtén información actualizada, fechas y horarios para estar preparado. ¡Accede ahora y planifica mejor tus actividades!",
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
