import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let motor: any = null;

function initMotor() {
  if (motor) return motor;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const db_insumos = require("../../../lib/db_insumos.js");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { db_tipologias, db_factores_calidad } = require("../../../lib/db_tipologias.js");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const db_factores_sict = require("../../../lib/db_factores_sict.js");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const db_apus = require("../../../lib/db_apus.js");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const MotorNeodata = require("../../../lib/ObraDigitalEngine.js");

  // Fusionar instalaciones_hidro_sanitarias + instalaciones_electricas en una sola clave
  db_insumos.instalaciones = {
    ...db_insumos.instalaciones_hidro_sanitarias,
    ...db_insumos.instalaciones_electricas,
  };

  MotorNeodata.inicializar(
    db_insumos,
    db_tipologias,
    db_factores_sict,
    db_apus,
    db_factores_calidad
  );

  motor = MotorNeodata;
  return motor;
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

    const m = Math.max(10, Number(metros_cuadrados));
    const n = Math.max(1, Math.round(Number(niveles) || 1));

    const engine = initMotor();
    const principal = engine.calcularPresupuesto(m, n, id_tipologia, id_estado, id_calidad);
    const economico = engine.calcularPresupuesto(m, n, id_tipologia, id_estado, "economico");
    const estandar  = engine.calcularPresupuesto(m, n, id_tipologia, id_estado, "estandar");
    const premium   = engine.calcularPresupuesto(m, n, id_tipologia, id_estado, "premium");

    return NextResponse.json({ principal, economico, estandar, premium });
  } catch (err) {
    console.error("[/api/calcular]", err);
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
