import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Incluir archivos lib en el bundle serverless de Vercel
  outputFileTracingIncludes: {
    "/api/calcular": ["./lib/*.js"],
  },
};

export default nextConfig;
