import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import "./snaptrude.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ConstruIA.mx — Copiloto Arquitectónico para México",
  description:
    "La plataforma de inteligencia para la industria de la construcción en México. Presupuesto profesional, agente IA especializado y herramientas para arquitectos e ingenieros.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${robotoMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
