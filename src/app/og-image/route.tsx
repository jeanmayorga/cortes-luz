import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

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
          src="https://www.cortesdeluz.com/shareable.jpg"
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
      width: 630,
      height: 630,
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
