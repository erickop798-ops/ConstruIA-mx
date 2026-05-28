import type { Metadata } from "next";
import { Geist, Playfair_Display } from 'next/font/google';
import "./globals.css";
import "./snaptrude.css";

const geist = Geist({ subsets: ['latin'] });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
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
    <html lang="es" className={`${geist.className} ${playfair.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
