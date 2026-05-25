import type { Metadata } from "next";
import { Geist } from 'next/font/google';
import "./globals.css";
import "./snaptrude.css";

const geist = Geist({ subsets: ['latin'] });

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
    <html lang="es">
      <body className={`${geist.className} antialiased`}>{children}</body>
    </html>
  );
}
