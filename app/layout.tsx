import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import "./snaptrude.css";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
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
    <html lang="es" className={`${cormorant.variable} ${inter.variable} ${mono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
