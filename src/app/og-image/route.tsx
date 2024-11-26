import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "Cortes de Energia";
export const size = {
  width: 630,
  height: 630,
};
export const contentType = "image/png";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Default Title";
  const fontPath = path.join(process.cwd(), "public", "Montserrat-Bold.ttf");
  const fontData = await fs.promises.readFile(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <img
          src="https://www.cnelep.gob.ec/wp-content/uploads/2024/08/cortes_energia_compartir.jpg"
          alt="Cortes de energía"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "420px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            color: "#fff",
            fontSize: "50px",
            fontWeight: "800",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Montserrat",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
