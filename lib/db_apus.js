// ObraDigitalMX - Modulo 4: Ensamblados Parametricos (APUs Base)
// Consumo estadistico para 1 m2 de construccion base en Mexico.
// CORREGIDO: const -> var, extension .js (era .txt)

var db_apus = {
  "construccion_base_m2": {
    materiales: [
      { id: "cemento_cpc30r",  cantidad: 1.25, desperdicio: 1.05 },
      { id: "arena_fina",      cantidad: 0.12, desperdicio: 1.08 },
      { id: "grava_19mm",      cantidad: 0.12, desperdicio: 1.08 },
      { id: "block_15x20x40", cantidad: 16.0, desperdicio: 1.05 },
      { id: "varilla_3_8",    cantidad: 3.2,  desperdicio: 1.05 },
      { id: "varilla_1_2",    cantidad: 1.8,  desperdicio: 1.05 },
      { id: "tubo_pvc_san_4", cantidad: 0.15, desperdicio: 1.05 },
      { id: "cable_thw_12",   cantidad: 0.35, desperdicio: 1.05 }
    ],
    mano_obra: [
      { id: "oficial_albanil",      rendimiento_m2_jornada: 2.2 },
      { id: "peon",                  rendimiento_m2_jornada: 2.2 },
      { id: "oficial_electricista", rendimiento_m2_jornada: 6.0 },
      { id: "oficial_plomero",      rendimiento_m2_jornada: 6.0 }
    ]
  }
};
