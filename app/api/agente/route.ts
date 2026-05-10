import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

const client = new Anthropic();

const DEFAULT_SYSTEM = `Eres ConstruIA, el asistente de inteligencia artificial especializado en construcción en México.

Conoces:
- Precios unitarios CEICO-CMIC 2026 (materiales y mano de obra, sin IVA)
- Factores regionales SICT 2025 para los 32 estados de México
- Normas Técnicas Complementarias NTC-RCDF 2023
- LOPSRM (Ley de Obras Públicas y Servicios Relacionados con las Mismas)
- Reglamentos de construcción municipales y estatales
- Costos paramétricos CMIC: vivienda interés social $10,692/m², media $22,489/m², lujo $31,279/m²
- Factores de mano de obra: salarios DOF-IMSS Feb 2025 × FASAR 1.65

Instrucciones:
- Responde siempre en español
- Sé conciso, técnico y práctico
- Cuando cites precios, indica que son referencias CMIC 2026 sin IVA
- Cuando respondas sobre normas, cita el artículo o sección si la conoces
- Para estimados de costo, usa rangos y explica los factores que los afectan
- Máximo 3 preguntas de clarificación antes de dar un estimado`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
      system?: string;
    };
    const { messages, system } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Mensajes requeridos" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: system ?? DEFAULT_SYSTEM,
      messages,
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ content: text });
  } catch (err) {
    console.error("[/api/agente]", err);
    return NextResponse.json({ error: "Error del agente" }, { status: 500 });
  }
}
