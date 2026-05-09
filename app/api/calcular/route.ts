import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { runInNewContext } from "vm";

export const runtime = "nodejs";

type EngineContext = Record<string, unknown>;

let cachedEngine: EngineContext | null = null;

function loadEngine(): EngineContext {
  const ctx: EngineContext = {};
  const libs = [
    "db_insumos",
    "db_tipologias",
    "db_factores_sict",
    "db_apus",
    "ObraDigitalEngine",
  ];
  for (const lib of libs) {
    const code = readFileSync(
      join(process.cwd(), "lib", `${lib}.js`),
      "utf-8"
    );
    runInNewContext(code, ctx);
  }
  // db_insumos usa instalaciones_hidro_sanitarias / instalaciones_electricas
  // pero el engine busca insumos.instalaciones — agregamos la propiedad fusionada
  const ins = ctx.db_insumos as Record<string, Record<string, unknown>>;
  ins.instalaciones = {
    ...((ins.instalaciones_hidro_sanitarias as Record<string, unknown>) ?? {}),
    ...((ins.instalaciones_electricas      as Record<string, unknown>) ?? {}),
  };

  const motor = ctx.MotorNeodata as {
    inicializar: (...args: unknown[]) => void;
    calcularPresupuesto: (...args: unknown[]) => unknown;
  };
  motor.inicializar(
    ctx.db_insumos,
    ctx.db_tipologias,
    ctx.db_factores_sict,
    ctx.db_apus,
    ctx.db_factores_calidad
  );
  return ctx;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { metros_cuadrados, niveles, id_tipologia, id_estado, id_calidad } =
      body as {
        metros_cuadrados: number;
        niveles: number;
        id_tipologia: string;
        id_estado: string;
        id_calidad: string;
      };

    if (!metros_cuadrados || !id_tipologia || !id_estado || !id_calidad) {
      return NextResponse.json(
        { error: "Parámetros incompletos" },
        { status: 400 }
      );
    }

    if (!cachedEngine) cachedEngine = loadEngine();

    const motor = cachedEngine.MotorNeodata as {
      calcularPresupuesto: (
        m: number,
        n: number,
        tip: string,
        est: string,
        cal: string
      ) => unknown;
    };

    const n = Math.max(1, Math.round(niveles || 1));
    const m = Math.max(10, metros_cuadrados);

    const principal = motor.calcularPresupuesto(m, n, id_tipologia, id_estado, id_calidad);
    const economico = motor.calcularPresupuesto(m, n, id_tipologia, id_estado, "economico");
    const estandar  = motor.calcularPresupuesto(m, n, id_tipologia, id_estado, "estandar");
    const premium   = motor.calcularPresupuesto(m, n, id_tipologia, id_estado, "premium");

    return NextResponse.json({ principal, economico, estandar, premium });
  } catch (err) {
    console.error("[/api/calcular]", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
