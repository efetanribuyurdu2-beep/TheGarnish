import type { Metadata, Viewport } from "next";
import { PrefsProvider } from "@/lib/prefs";
import { Shell } from "@/components/Shell";
import { themeCSS } from "@/lib/themeKit";
import { PHASE_BOOT } from "@/lib/daytime";
import "./globals.css";

// absolute URLs for social previews (og:image); Vercel names the production host
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const metadata: Metadata = {
  metadataBase: new URL(host ? `https://${host}` : "http://localhost:3100"),
  title: "Garnish — Cocktail Worlds",
  description: "A luxury cocktail atlas: seven worlds, a sommelier-style ingredient cellar and an atelier to design your own signature.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#0b0b0b" };

const FONTS =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500&family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400&family=Aref+Ruqaa:wght@400;700&family=Syncopate:wght@400;700&family=Exo+2:wght@300;400;600&family=Limelight&family=Poiret+One&family=Forum&family=Josefin+Sans:wght@300;400;600&family=Zen+Antique&family=Shippori+Mincho:wght@400;600&family=Zen+Kaku+Gothic+New:wght@300;400;500&family=Grenze+Gotisch:wght@400;500;600&family=Kavoon&family=Karla:wght@300;400;600&family=Ruslan+Display&family=Aboreto&family=Lora:ital,wght@0,400;0,500;1,400&family=Noto+Sans+Runic&family=Noto+Sans+Old+Turkic&family=GFS+Didot&display=swap";

// Applies the saved world before first paint so there is no colour flash.
const boot = `try{var p=JSON.parse(localStorage.getItem("garnish:prefs:v1")||"{}");var h=document.documentElement;h.dataset.world=p.world||"maison";h.dataset.palette=p.palette||"noir";if(p.lang)h.lang=p.lang;}catch(e){}try{var h=document.documentElement;${PHASE_BOOT}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-world="maison" data-palette="noir" data-time="dusk" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <style dangerouslySetInnerHTML={{ __html: themeCSS() }} />
      </head>
      <body>
        <PrefsProvider>
          <Shell>{children}</Shell>
        </PrefsProvider>
      </body>
    </html>
  );
}
