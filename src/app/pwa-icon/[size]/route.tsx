import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/Logo";
import { svgDataUri, svgString } from "@/lib/svgString";

/** App icons for the manifest and the home screen, drawn from the logo (no image files). */
export const dynamic = "force-static";
export function generateStaticParams() {
  return [{ size: "180" }, { size: "192" }, { size: "512" }, { size: "maskable-512" }];
}

export async function GET(_: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  const maskable = size.startsWith("maskable");
  const px = parseInt(size.replace("maskable-", ""), 10) || 192;
  const mark = svgDataUri(svgString(<LogoMark size={px} />).replace(/currentColor/g, "#d9b25f").replace(/var\(--bg\)/g, "#0b0b0b"));
  // maskable icons keep the mark inside the central 80% safe zone
  const inner = Math.round(px * (maskable ? 0.62 : 0.84));
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: px, height: px, alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at 50% 35%, #2a2418, #0b0b0b 70%)" }}>
        <img src={mark} width={inner} height={inner} />
      </div>
    ),
    { width: px, height: px },
  );
}
