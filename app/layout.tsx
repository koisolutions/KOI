import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Display con carácter — usada con moderación (títulos y una cita)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

// Body limpia y legible
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

// Utilitaria para datos / código / labels de sección
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "estudio de software",
    "software a medida",
    "Django",
    "React",
    "sistemas internos",
    "portales de cliente",
    "automatización",
    "Chile",
    "KOI",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "es_CL",
    siteName: site.name,
    url: `https://${site.domain}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

// Fija el tema antes de pintar para evitar flash (device o preferencia guardada).
const themeScript = `(function(){try{var t=localStorage.getItem('koi-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:(d?'dark':'light');}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${fraunces.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
