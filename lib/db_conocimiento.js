// ═══════════════════════════════════════════════════════════════
// ObraDigitalMX — Base de Conocimiento Técnico Oficial
// db_conocimiento.js — Versión 1.0.0 — Abril 2026
// ═══════════════════════════════════════════════════════════════
//
// FUENTES VERIFICADAS Y OFICIALES:
//   [1] LOPSRM — Ley de Obras Públicas y Servicios Relacionados
//       con las Mismas. Última reforma DOF 16-abril-2025.
//   [2] RLOPSRM — Reglamento de la LOPSRM. Arts. 185-220
//       (Integración de costos directos e indirectos).
//   [3] DOF-IMSS 05-Feb-2025 — Acuerdo ACDO.AS2.HCT.280125/22.P.DIR
//       Costos de mano de obra por m2 y factores LOPSRM 2025.
//   [4] CEICO-CMIC — Centro Nacional de Ingeniería de Costos.
//       Costos paramétricos oct-2024 + ajuste +4.52pct anual 2025.
//   [5] INEGI-INPP — Índice Nacional de Precios Productor.
//       Variaciones 2025: mat +4.28pct, MO +5.98pct, maq +1.34pct.
//   [6] UMA 2025 — $113.14 diarios. DOF 10-enero-2025.
//   [7] NTC-RCDF 2023 — Normas Técnicas Complementarias del
//       Reglamento de Construcciones del Distrito Federal.
//   [8] SICT Tabulador 2025 — Costos directos infraestructura.
//   [9] Rendimientos verificados — Tabla CMIC / fuentes académicas
//       arquitectura México (rendimientos estándar nacionales).
//  [10] Lifi Herramientas / IMIE SAS — Precios mercado centro
//       Bajío marzo 2026.
//
// USO: Este archivo es leído por:
//   — El motor de cálculo de ObraDigitalMX (ObraDigitalEngine.js)
//   — El agente IA de chat (como contexto en system prompt)
//   — La función de generación de PDF profesional
//
// REGLA ABSOLUTA: var siempre. Sin let, const, backticks.
// ═══════════════════════════════════════════════════════════════

var db_conocimiento = {

  // ─────────────────────────────────────────────────────────────
  // SECCIÓN 1 — ESTRUCTURA OFICIAL DE PRESUPUESTO
  // Basada en LOPSRM Arts. 27, 36, 38 y RLOPSRM Arts. 185-220
  // Válida para obra pública federal y referencia para privada
  // ─────────────────────────────────────────────────────────────
  estructura_presupuesto_lopsrm: {

    descripcion: "Estructura oficial de integración de costos según LOPSRM y su Reglamento",
    fuente: "LOPSRM DOF 16-abr-2025 + RLOPSRM Arts. 185-220",

    componentes_costo_directo: {
      materiales: {
        descripcion: "Precio de adquisición en mercado + acarreos + maniobras + almacenajes + mermas aceptables",
        fuente: "RLOPSRM Art. 193",
        merma_tipica_pct: 5,
        desperdicio_tipico_pct: 10
      },
      mano_de_obra: {
        descripcion: "Salario tabular + prestaciones de ley + FASAR. Calculado con UMA vigente.",
        fuente: "DOF-IMSS 05-Feb-2025 + RLOPSRM Art. 194",
        fasar_2025: 1.65,
        uma_diaria_2025: 113.14,
        base_calculo: "UMA 2025 $113.14/dia x FASAR 1.65 = factor base prestaciones"
      },
      maquinaria_equipo: {
        descripcion: "Costo horario: depreciación + mantenimiento + operación + operador",
        fuente: "CMIC Catálogo Costos Horarios Maquinaria 2025 + RLOPSRM Art. 195",
        incremento_anual_2025_pct: 1.34
      }
    },

    costos_indirectos: {
      descripcion: "Gastos generales de la empresa sobre el costo directo total",
      fuente: "RLOPSRM Arts. 197-202",
      rango_tipico_pct: { min: 10, max: 20 },
      valor_referencia_obra_privada_pct: 15,
      componentes: [
        "Administración de oficina central",
        "Supervisión técnica",
        "Seguros y fianzas",
        "Servicios temporales en obra (bodega, oficina, sanitarios)",
        "Fletes y acarreos no contemplados en materiales",
        "Herramienta menor"
      ]
    },

    utilidad: {
      descripcion: "Ganancia del contratista sobre costo directo + indirectos",
      fuente: "LOPSRM Art. 36 + práctica de mercado",
      rango_obra_publica_pct: { min: 5, max: 12 },
      valor_referencia_obra_privada_pct: 10
    },

    financiamiento: {
      descripcion: "Costo del capital durante ejecución. Aplica en obra pública.",
      fuente: "RLOPSRM Art. 203",
      valor_referencia_pct: 2,
      nota: "En obra privada pequeña generalmente se omite o incluye en indirectos"
    },

    cargos_adicionales: {
      descripcion: "Pruebas de laboratorio, estudios, permisos específicos de la obra",
      fuente: "RLOPSRM Art. 204",
      valor_referencia_pct: 1
    },

    iva: {
      tasa_general_pct: 16,
      tasa_frontera_norte_pct: 8,
      nota: "Contratos LOPSRM: precio unitario + IVA por separado. Obra privada: varía por contrato.",
      fuente: "LIVA vigente 2025"
    },

    formula_precio_total: {
      descripcion: "PC = CD x (1 + CI) x (1 + U) x (1 + F) x (1 + CA) x (1 + IVA)",
      donde: {
        PC: "Precio de contrato",
        CD: "Costo directo",
        CI: "Factor de costos indirectos (ej: 0.15)",
        U: "Factor de utilidad (ej: 0.10)",
        F: "Factor de financiamiento (ej: 0.02)",
        CA: "Factor de cargos adicionales (ej: 0.01)",
        IVA: "Factor IVA (0.16)"
      },
      ejemplo_aplicado: {
        costo_directo: 1000000,
        con_indirectos_15pct: 1150000,
        con_utilidad_10pct: 1265000,
        con_financiamiento_2pct: 1290300,
        con_cargos_adicionales_1pct: 1303203,
        con_iva_16pct: 1511715,
        nota: "El costo directo representa aprox el 60-70pct del precio total al cliente"
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // SECCIÓN 2 — CATÁLOGO OFICIAL DE PARTIDAS DE OBRA
  // Estructura estándar para presupuesto residencial y comercial
  // Basada en LOPSRM + práctica profesional México
  // ─────────────────────────────────────────────────────────────
  catalogo_partidas: {

    "P01": {
      nombre: "Trabajos Preliminares",
      descripcion: "Todas las acciones previas al inicio de la obra estructural",
      fuente: "LOPSRM + Guía ORFIS 2023",
      conceptos: {
        "P01.01": {
          descripcion: "Limpieza y desenraice manual de terreno con maleza hasta 1.0m altura",
          unidad: "m2",
          costo_unitario_ref: 45.00,
          incluye: "apile de material, mano de obra, herramienta",
          fuente: "Tabulador CDMX enero 2025"
        },
        "P01.02": {
          descripcion: "Trazo y nivelación de la obra con estacas y referencias",
          unidad: "m2",
          costo_unitario_ref: 35.00,
          incluye: "estacas, hilo, cal, nivel, mano de obra",
          fuente: "Precios mercado zona centro 2025"
        },
        "P01.03": {
          descripcion: "Construcción de bodega provisional en obra (madera + lámina)",
          unidad: "m2",
          costo_unitario_ref: 850.00,
          incluye: "material, mano de obra, desmontaje al final",
          nota: "Mínimo 12m2 recomendado para obra de vivienda"
        },
        "P01.04": {
          descripcion: "Letrina o sanitario provisional en obra",
          unidad: "pieza",
          costo_unitario_ref: 3500.00,
          incluye: "caseta, instalación básica, mantenimiento mensual"
        },
        "P01.05": {
          descripcion: "Acometida provisional de energía eléctrica para construcción",
          unidad: "servicio",
          costo_unitario_ref: 4500.00,
          incluye: "trámite CFE, medidor temporal, tablero provisional"
        },
        "P01.06": {
          descripcion: "Toma provisional de agua para construcción",
          unidad: "servicio",
          costo_unitario_ref: 2800.00,
          incluye: "trámite, tubería provisional, llave de paso"
        }
      },
      cuantia_tipica_por_m2_obra: {
        limpieza_m2: 1.0,
        trazo_m2: 1.0,
        bodega_m2_x_m2_obra: 0.12,
        nota: "La bodega representa aprox 12pct de la superficie total"
      }
    },

    "P02": {
      nombre: "Cimentación",
      descripcion: "Trabajos de excavación, plantilla y elementos de cimentación",
      fuente: "NTC-RCDF 2023 + CEICO-CMIC + rendimientos verificados",
      conceptos: {
        "P02.01": {
          descripcion: "Excavación a mano en material tipo I (tierra suelta) hasta 1.5m prof.",
          unidad: "m3",
          costo_unitario_ref: 320.00,
          rendimiento: "1 peon: 2.5 m3/dia en terreno normal",
          incluye: "mano de obra, herramienta, apile en lugar",
          fuente: "Tabulador CDMX 2025 + CEICO"
        },
        "P02.02": {
          descripcion: "Excavación a máquina en material tipo I de 0.0 a 2.0m profundidad",
          unidad: "m3",
          costo_unitario_ref: 180.00,
          rendimiento: "Retroexcavadora 0.8m3: 80-120 m3/dia",
          incluye: "retroexcavadora con operador, combustible",
          fuente: "CMIC Catálogo Maquinaria 2025"
        },
        "P02.03": {
          descripcion: "Acarreo y retiro de material producto de excavación fuera de obra",
          unidad: "m3",
          costo_unitario_ref: 280.00,
          incluye: "carga, camión de volteo 7m3, disposición final",
          nota: "El volumen excavado es aprox 1.25x el volumen de cimiento"
        },
        "P02.04": {
          descripcion: "Plantilla de concreto simple fc=100 kg/cm2, e=5cm",
          unidad: "m2",
          costo_unitario_ref: 185.00,
          cuantia_cemento: "0.11 bolsas/m2",
          incluye: "material, colocación, vibrado ligero",
          fuente: "Precios mercado centro 2025"
        },
        "P02.05": {
          descripcion: "Zapata aislada de concreto armado fc=200 tipo 1.20x1.20m",
          unidad: "pieza",
          costo_unitario_ref: 1900.00,
          incluye: "excavación 1m, plantilla, armado, colado fc=200",
          rendimiento: "1 zapata: equipo de 3 trabajadores 1 dia",
          fuente: "juve3dstudio verificado + CEICO 2025"
        },
        "P02.06": {
          descripcion: "Zapata corrida de concreto armado fc=200, 40x20cm",
          unidad: "ml",
          costo_unitario_ref: 520.00,
          incluye: "excavación 1m prof, plantilla, armado, colado",
          fuente: "juve3dstudio verificado + precios zona centro 2025"
        },
        "P02.07": {
          descripcion: "Losa de cimentación de concreto armado fc=200, e=15cm",
          unidad: "m2",
          costo_unitario_ref: 1450.00,
          incluye: "excavación, compactación, plantilla, malla, colado",
          uso: "Suelos blandos o arcillosos, mayor distribución de cargas"
        },
        "P02.08": {
          descripcion: "Contratrabe de concreto armado fc=200, 20x30cm",
          unidad: "ml",
          costo_unitario_ref: 680.00,
          incluye: "cimbra, armado, colado, descimbrado",
          fuente: "Precios mercado centro 2025"
        },
        "P02.09": {
          descripcion: "Relleno y compactación con material de banco por capas de 20cm",
          unidad: "m3",
          costo_unitario_ref: 380.00,
          rendimiento: "Compactador sapo: 15-20 m3/dia",
          incluye: "material tepetate, tendido, compactación, agua"
        }
      },
      cuantias_tipicas: {
        excavacion_m3_por_m2_construccion: {
          zapatas_aisladas: 0.35,
          losa_cimentacion: 0.55,
          nota: "Para vivienda 2 niveles zona sísmica centro México"
        },
        concreto_m3_por_m2_construccion: {
          cimentacion_vivienda: 0.12,
          fuente: "NTC-RCDF 2023 + CEICO"
        },
        acero_kg_por_m3_concreto_cimentacion: {
          zapatas: 70,
          losa_cimentacion: 90,
          fuente: "NTC-RCDF 2023"
        }
      }
    },

    "P03": {
      nombre: "Estructura",
      descripcion: "Elementos estructurales verticales y horizontales sobre cimentación",
      fuente: "NTC-RCDF 2023 + CEICO-CMIC + rendimientos verificados",
      conceptos: {
        "P03.01": {
          descripcion: "Castillo de concreto armado fc=200, 12x12cm, con 4 var 3/8 + estribos 1/4 @ 20cm",
          unidad: "ml",
          costo_unitario_ref: 185.00,
          cuantia_acero_kg_m: 2.8,
          cuantia_concreto_m3_m: 0.0144,
          rendimiento: "oficial albanil + peon: 12 ml/dia",
          fuente: "CEICO + precios mercado centro 2025",
          separacion_tipica: "Cada 3.0m en muros de block. NTC exige max 4.0m en zona sismica."
        },
        "P03.02": {
          descripcion: "Dala o cadena de cerramiento de concreto armado fc=200, 15x20cm",
          unidad: "ml",
          costo_unitario_ref: 220.00,
          cuantia_acero_kg_m: 4.2,
          cuantia_concreto_m3_m: 0.03,
          rendimiento: "oficial albanil + peon: 10 ml/dia",
          fuente: "CEICO + precios mercado centro 2025",
          nota: "Va en la parte superior de cada nivel de muro"
        },
        "P03.03": {
          descripcion: "Columna de concreto armado fc=250, 20x20cm, con 4 var 1/2 + estribos 3/8 @ 15cm",
          unidad: "ml",
          costo_unitario_ref: 850.00,
          cuantia_acero_kg_m: 9.5,
          cuantia_concreto_m3_m: 0.04,
          rendimiento: "cuadrilla 4 trabajadores: 8 ml/dia",
          fuente: "CEICO + precios mercado centro 2025"
        },
        "P03.04": {
          descripcion: "Trabe principal de concreto armado fc=250, 20x30cm",
          unidad: "ml",
          costo_unitario_ref: 1100.00,
          cuantia_acero_kg_m: 14.0,
          cuantia_concreto_m3_m: 0.06,
          rendimiento: "cuadrilla 4 trabajadores: 6 ml/dia"
        },
        "P03.05": {
          descripcion: "Losa maciza de concreto armado fc=200, e=10cm, con malla 6x6-10/10",
          unidad: "m2",
          costo_unitario_ref: 980.00,
          cuantia_concreto_m3_m2: 0.10,
          cuantia_acero_kg_m2: 7.5,
          rendimiento: "colado: 25-35 m2/dia con revolvedora",
          fuente: "CEICO + juve3dstudio verificado 2025",
          nota: "Incluye cimbra, armado, colado, vibrado y curado 7 dias"
        },
        "P03.06": {
          descripcion: "Losa de vigueta y bovedilla prefabricada, con capa de compresión 5cm",
          unidad: "m2",
          costo_unitario_ref: 750.00,
          cuantia_acero_kg_m2: 5.0,
          cuantia_concreto_m3_m2: 0.05,
          rendimiento: "instalación: 30-40 m2/dia",
          fuente: "CEICO + precios mercado centro 2025",
          ventaja: "30pct más ligera que losa maciza. Menor carga en columnas."
        },
        "P03.07": {
          descripcion: "Losacero (steel deck) lámina colaborante Cal.22 + concreto fc=200, e=12cm",
          unidad: "m2",
          costo_unitario_ref: 950.00,
          rendimiento: "instalación rápida: 50-60 m2/dia",
          uso: "Estructuras metálicas y comercial/industrial"
        },
        "P03.08": {
          descripcion: "Cimbra de triplay para losa/trabe/columna, incluye descimbrado",
          unidad: "m2",
          costo_unitario_ref: 420.00,
          rendimiento: "armado: 15 m2/dia, descimbrado a los 14 dias",
          fuente: "juve3dstudio verificado + precios centro 2025"
        }
      },
      cuantias_tipicas_estructura: {
        castillos_ml_por_m2_muro: 0.67,
        dalas_ml_por_m2_planta: 0.40,
        nota_sismica: "Zona sísmica centro México (NTC-RCDF): castillo cada 3m, dala en cada nivel",
        acero_total_kg_por_m2_construccion: {
          vivienda_1_nivel: 18,
          vivienda_2_niveles: 28,
          edificio_3_a_5_niveles: 45,
          fuente: "CEICO-CMIC rangos típicos zona centro"
        }
      }
    },

    "P04": {
      nombre: "Albañilería",
      descripcion: "Levantamiento de muros y elementos de mampostería",
      fuente: "Rendimientos CMIC + NTC + precios zona centro 2025-2026",
      conceptos: {
        "P04.01": {
          descripcion: "Muro de block hueco 15x20x40cm con mortero 1:4, e=15cm",
          unidad: "m2",
          costo_unitario_ref: 420.00,
          piezas_por_m2: 12.5,
          mortero_litros_por_m2: 18,
          rendimiento: "oficial albanil + peon: 10-12 m2/dia planta baja, 8-10 m2/dia niveles sup.",
          fuente: "CMIC rendimientos estándar + precios centro 2025",
          nota: "El rendimiento baja 20pct por nivel. Incluye 5pct desperdicio."
        },
        "P04.02": {
          descripcion: "Muro de tabique rojo recocido 7x14x28cm con mortero 1:3",
          unidad: "m2",
          costo_unitario_ref: 390.00,
          piezas_por_m2: 35,
          rendimiento: "oficial albanil + peon: 8-10 m2/dia",
          ventaja: "Mejor aislamiento térmico que block según NTC eficiencia energética"
        },
        "P04.03": {
          descripcion: "Muro divisorio de tabique 7x14x28cm, e=14cm (sencillo)",
          unidad: "m2",
          costo_unitario_ref: 320.00,
          piezas_por_m2: 35,
          rendimiento: "oficial albanil + peon: 10-12 m2/dia"
        },
        "P04.04": {
          descripcion: "Aplanado o zarpeo con mezcla cemento-arena en muro exterior, e=2cm",
          unidad: "m2",
          costo_unitario_ref: 120.00,
          rendimiento: "cuadrilla 1 oficial + 1 ayudante: 12.5 m2/dia",
          fuente: "Tabla rendimientos CMIC + juve3dstudio 2025"
        },
        "P04.05": {
          descripcion: "Afine de aplanado (alisado final para recibir pintura o acabado)",
          unidad: "m2",
          costo_unitario_ref: 80.00,
          rendimiento: "cuadrilla 1 oficial + 1 ayudante: 15 m2/dia",
          fuente: "juve3dstudio 2025 verificado"
        },
        "P04.06": {
          descripcion: "Aplanado de yeso en muro interior a plomo y regla, e=1.5cm",
          unidad: "m2",
          costo_unitario_ref: 140.00,
          rendimiento: "cuadrilla 1 yesero + 1 ayudante: 12.5 m2/dia",
          fuente: "Tabla rendimientos CMIC + precios zona centro 2025"
        },
        "P04.07": {
          descripcion: "Firme de concreto simple fc=150, e=8cm sobre terreno compactado",
          unidad: "m2",
          costo_unitario_ref: 320.00,
          cuantia_concreto_m3_m2: 0.08,
          rendimiento: "cuadrilla 4 trabajadores: 20-25 m2/dia",
          fuente: "juve3dstudio verificado + precios centro 2025"
        }
      },
      cuantias_tipicas_albanileria: {
        superficie_muros_factor: {
          descripcion: "Factor superficie de muros respecto a superficie de planta",
          vivienda_1_nivel: 1.8,
          vivienda_2_niveles: 2.4,
          local_comercial: 1.4,
          nota: "Factor varía según altura de entrepiso (2.4m a 2.8m típico)"
        },
        muros_exteriores_pct_del_total: 0.40,
        muros_interiores_pct_del_total: 0.60
      }
    },

    "P05": {
      nombre: "Instalación Hidráulica y Sanitaria",
      descripcion: "Red de agua potable fría y caliente, drenaje sanitario y aparatos",
      fuente: "NOM-002-CNA-2016 + precios mercado centro 2025-2026",
      conceptos: {
        "P05.01": {
          descripcion: "Salida de agua fría con tubo PVC hidráulico 13mm (1/2 pulg)",
          unidad: "salida",
          costo_unitario_ref: 380.00,
          material: "tubo PVC hid 1/2, codos, tee, pegamento azul",
          rendimiento: "plomero oficial: 4-6 salidas/dia"
        },
        "P05.02": {
          descripcion: "Salida de agua caliente con tubo PPR termofusión 13mm",
          unidad: "salida",
          costo_unitario_ref: 480.00,
          material: "tubo PPR verde 1/2, codos, tee, termofusora",
          ventaja: "Cero fugas garantizadas. Recomendado sobre CPVC.",
          rendimiento: "plomero oficial: 3-4 salidas/dia"
        },
        "P05.03": {
          descripcion: "Salida de drenaje sanitario con tubo PVC 51mm (2 pulg)",
          unidad: "salida",
          costo_unitario_ref: 320.00,
          material: "tubo PVC san 2 pulg, codos, yee, pegamento"
        },
        "P05.04": {
          descripcion: "Red de drenaje principal con tubo PVC 102mm (4 pulg)",
          unidad: "ml",
          costo_unitario_ref: 280.00,
          incluye: "tubo, junta, pendiente mínima 2pct, prueba hidrostática"
        },
        "P05.05": {
          descripcion: "WC económico blanco instalado completo con llave de angulo",
          unidad: "pieza",
          costo_unitario_ref: 2800.00,
          rendimiento: "plomero: 2 piezas/dia"
        },
        "P05.06": {
          descripcion: "Lavabo de sobreponer blanco instalado con llaves mezcladora",
          unidad: "pieza",
          costo_unitario_ref: 2650.00,
          incluye: "lavabo, llaves, sifón, tornillería"
        },
        "P05.07": {
          descripcion: "Regadera con mezcladora monocontrol instalada",
          unidad: "pieza",
          costo_unitario_ref: 1850.00,
          incluye: "mezcladora, cabezal, brazos, flexible"
        },
        "P05.08": {
          descripcion: "Tinaco polietileno 1100L instalado en azotea",
          unidad: "pieza",
          costo_unitario_ref: 3800.00,
          incluye: "tinaco, válvula flotador, tuberías conexión, soporte"
        },
        "P05.09": {
          descripcion: "Registro de albañal 60x60cm de mampostería con tapa PVC",
          unidad: "pieza",
          costo_unitario_ref: 1800.00
        },
        "P05.10": {
          descripcion: "Prueba hidrostática y de hermeticidad de instalación completa",
          unidad: "servicio",
          costo_unitario_ref: 1200.00,
          nota: "Obligatoria antes de tapar instalación"
        }
      },
      cuantias_tipicas: {
        salidas_agua_fria_por_bano: 3,
        salidas_agua_caliente_por_bano: 2,
        salidas_drenaje_por_bano: 3,
        salidas_cocina: { fria: 2, caliente: 1, drenaje: 1 },
        salidas_por_m2_construccion_vivienda: {
          agua_fria: 0.18,
          agua_caliente: 0.10,
          drenaje: 0.12
        }
      }
    },

    "P06": {
      nombre: "Instalación Eléctrica",
      descripcion: "Red de distribución eléctrica interior, tablero y dispositivos",
      fuente: "NOM-001-SEDE-2012 + precios mercado centro 2025-2026",
      conceptos: {
        "P06.01": {
          descripcion: "Salida para iluminación general con cable THW cal.14 y poliducto 1/2",
          unidad: "salida",
          costo_unitario_ref: 280.00,
          material: "cable THW cal.14 certificado NOM-001-SEDE, poliducto naranja 1/2",
          rendimiento: "electricista oficial: 6-8 salidas/dia",
          advertencia: "NUNCA usar cable alucobre. Riesgo incendio. Certificación NOM obligatoria."
        },
        "P06.02": {
          descripcion: "Salida para contacto 127V polarizado con cable THW cal.12 y poliducto",
          unidad: "salida",
          costo_unitario_ref: 320.00,
          material: "cable THW cal.12 certificado NOM-001-SEDE",
          rendimiento: "electricista oficial: 5-6 salidas/dia"
        },
        "P06.03": {
          descripcion: "Salida para contacto con tierra física (bano, cocina, AC)",
          unidad: "salida",
          costo_unitario_ref: 380.00,
          material: "cable THW cal.12 + cable tierra verde, contacto con tierra física",
          nota: "OBLIGATORIO en baños y cocina según NOM-001-SEDE"
        },
        "P06.04": {
          descripcion: "Salida para circuito de alta demanda (AC 2T, secadora) cable THW cal.10",
          unidad: "salida",
          costo_unitario_ref: 520.00,
          material: "cable THW cal.10 certificado, 30A"
        },
        "P06.05": {
          descripcion: "Tablero de distribución 8 circuitos con interruptores termomagnéticos",
          unidad: "pieza",
          costo_unitario_ref: 2800.00,
          rendimiento: "electricista oficial: 1 tablero/dia"
        },
        "P06.06": {
          descripcion: "Tablero de distribución 16 circuitos con interruptores termomagnéticos",
          unidad: "pieza",
          costo_unitario_ref: 4500.00
        },
        "P06.07": {
          descripcion: "Apagador sencillo instalado con placa y caja",
          unidad: "pieza",
          costo_unitario_ref: 180.00
        },
        "P06.08": {
          descripcion: "Apagador doble instalado con placa y caja",
          unidad: "pieza",
          costo_unitario_ref: 250.00
        },
        "P06.09": {
          descripcion: "Luminaria LED empotrada 15W instalada",
          unidad: "pieza",
          costo_unitario_ref: 350.00
        },
        "P06.10": {
          descripcion: "Acometida desde medidor hasta tablero principal, incluye ducto EMT",
          unidad: "servicio",
          costo_unitario_ref: 4800.00,
          nota: "Precio varía según distancia al medidor CFE"
        },
        "P06.11": {
          descripcion: "Prueba de aislamiento y continuidad de instalación eléctrica completa",
          unidad: "servicio",
          costo_unitario_ref: 1500.00,
          nota: "Obligatoria antes de energizar. Verificar con multímetro."
        }
      },
      cuantias_tipicas: {
        salidas_iluminacion_por_m2: 0.20,
        salidas_contacto_por_m2: 0.25,
        salidas_alta_demanda_por_vivienda: 3,
        circuitos_recomendados: {
          vivienda_80m2: 8,
          vivienda_120m2: 12,
          vivienda_200m2: 16,
          local_comercial_100m2: 12
        }
      }
    },

    "P07": {
      nombre: "Acabados",
      descripcion: "Recubrimientos de piso, muro, plafón y pintura",
      fuente: "CEICO-CMIC + rendimientos verificados + precios centro 2025-2026",
      conceptos: {
        "P07.01": {
          descripcion: "Colocación de piso cerámico 45x45cm con adhesivo tipo II",
          unidad: "m2",
          costo_unitario_ref: 320.00,
          adhesivo_kg_m2: 4.5,
          boquilla_kg_m2: 0.8,
          rendimiento: "colocador oficial: 8-10 m2/dia",
          desperdicio_pct: 10,
          norma: "NMX-C-484 adhesivo tipo II para pisos",
          fuente: "CEICO + precios zona centro 2025"
        },
        "P07.02": {
          descripcion: "Colocación de porcelanato 60x60cm con adhesivo tipo II flexible",
          unidad: "m2",
          costo_unitario_ref: 520.00,
          adhesivo_kg_m2: 5.5,
          rendimiento: "colocador oficial: 6-8 m2/dia",
          desperdicio_pct: 12,
          nota: "Mayor desperdicio por cortes en gran formato"
        },
        "P07.03": {
          descripcion: "Pintura vinílica interior 2 manos con sellador",
          unidad: "m2",
          costo_unitario_ref: 95.00,
          rendimiento_m2_por_cubeta_19l: 35,
          rendimiento_pintor: "pintor oficial: 40-50 m2/dia",
          fuente: "precios zona centro 2025"
        },
        "P07.04": {
          descripcion: "Pintura elastomérica exterior 2 manos con fijador",
          unidad: "m2",
          costo_unitario_ref: 125.00,
          rendimiento_m2_por_cubeta_19l: 30,
          rendimiento_pintor: "pintor oficial: 30-35 m2/dia"
        },
        "P07.05": {
          descripcion: "Impermeabilización de azotea con membrana acrílica 2 manos 5 años",
          unidad: "m2",
          costo_unitario_ref: 145.00,
          rendimiento_m2_por_cubeta_19l: 19,
          nota: "Aplicar en 2 manos cruzadas. Reponer cada 5 años."
        },
        "P07.06": {
          descripcion: "Muro tablaroca cara sencilla con estructura metálica",
          unidad: "m2",
          costo_unitario_ref: 280.00,
          material: "panel yeso 1.22x2.44, solera 38, canal 38",
          rendimiento: "cuadrilla 2 tablaroqueros: 15 m2/dia"
        },
        "P07.07": {
          descripcion: "Plafón reticular comercial con suspensión y paneles fibra mineral",
          unidad: "m2",
          costo_unitario_ref: 290.00,
          rendimiento: "cuadrilla 2 operarios: 20 m2/dia"
        }
      }
    },

    "P08": {
      nombre: "Carpintería y Cancelería",
      descripcion: "Puertas, ventanas, canceles y herrajes",
      fuente: "Precios mercado zona centro México 2025-2026",
      conceptos: {
        "P08.01": {
          descripcion: "Puerta interior de madera sólida 0.90x2.10m con marco y herrería básica",
          unidad: "pieza",
          costo_unitario_ref: 3800.00,
          rendimiento: "carpintero: 1 pieza/dia instalada"
        },
        "P08.02": {
          descripcion: "Puerta principal de madera sólida 1.00x2.10m con cerradura de seguridad",
          unidad: "pieza",
          costo_unitario_ref: 8500.00
        },
        "P08.03": {
          descripcion: "Ventana de aluminio natural con vidrio sencillo 6mm",
          unidad: "m2",
          costo_unitario_ref: 1850.00,
          rendimiento: "cancelero: 4-6 m2/dia"
        },
        "P08.04": {
          descripcion: "Ventana de aluminio anodizado con doble vidrio hermético",
          unidad: "m2",
          costo_unitario_ref: 2800.00,
          ventaja: "Mayor aislamiento térmico y acústico"
        },
        "P08.05": {
          descripcion: "Cancel de baño aluminio con vidrio templado 6mm",
          unidad: "pieza",
          costo_unitario_ref: 3200.00
        },
        "P08.06": {
          descripcion: "Portón de herrería 2 hojas 3.00x2.20m con pintura anticorrosiva",
          unidad: "pieza",
          costo_unitario_ref: 12500.00
        },
        "P08.07": {
          descripcion: "Barandal de herrería con pintura anticorrosiva y acabado esmalte",
          unidad: "ml",
          costo_unitario_ref: 1800.00
        }
      },
      cuantias_tipicas: {
        puertas_interiores_por_m2_construccion: 0.045,
        ventanas_m2_por_m2_construccion: 0.12,
        nota: "Varía mucho según diseño arquitectónico"
      }
    },

    "P09": {
      nombre: "Obras Exteriores",
      descripcion: "Barda perimetral, banqueta, guarnición y áreas complementarias",
      fuente: "Precios mercado zona centro México 2025-2026",
      conceptos: {
        "P09.01": {
          descripcion: "Barda perimetral de block 15x20x40 h=2.0m con pilastras y cadenas",
          unidad: "ml",
          costo_unitario_ref: 1850.00,
          incluye: "excavación, dados, castillos, bloque, aplanado un lado"
        },
        "P09.02": {
          descripcion: "Banqueta de concreto fc=200, e=10cm, con guarnición",
          unidad: "ml",
          costo_unitario_ref: 680.00,
          incluye: "excavación, base granular, plantilla, banqueta, guarnición"
        },
        "P09.03": {
          descripcion: "Área de jardín con nivelación, capa vegetal y pasto",
          unidad: "m2",
          costo_unitario_ref: 220.00
        },
        "P09.04": {
          descripcion: "Cisterna enterrada de mampostería 5000L con impermeabilización",
          unidad: "pieza",
          costo_unitario_ref: 18500.00,
          incluye: "excavación, mampostería, impermeabilizante, tapa"
        }
      }
    },

    "P10": {
      nombre: "Instalación de Gas",
      descripcion: "Red interior de gas LP o natural",
      fuente: "NOM-002-SECRE + precios mercado zona centro 2025",
      conceptos: {
        "P10.01": {
          descripcion: "Salida para aparato de gas (estufa, calentador, caldera) con tubo cobre o acero",
          unidad: "salida",
          costo_unitario_ref: 850.00,
          material: "tubo cobre 13mm o tubo conduit gas, válvula, conector flexible"
        },
        "P10.02": {
          descripcion: "Red interior de gas LP con regulador de 2 etapas y manifold",
          unidad: "servicio",
          costo_unitario_ref: 5500.00,
          incluye: "regulador, manifold, red hasta 3 salidas, prueba neumática",
          nota: "Requiere prueba de hermeticidad a 1.5 kg/cm2"
        },
        "P10.03": {
          descripcion: "Calentador de paso a gas 10L/min instalado completo",
          unidad: "pieza",
          costo_unitario_ref: 3800.00,
          incluye: "calentador, instalación hidráulica, conexión gas, chimenea"
        }
      }
    },

    "P11": {
      nombre: "Limpieza Final y Entrega",
      descripcion: "Retiro de escombros, limpieza general y entrega de obra",
      fuente: "Práctica profesional México",
      conceptos: {
        "P11.01": {
          descripcion: "Retiro de escombros y residuos de construcción con camión volteo",
          unidad: "viaje",
          costo_unitario_ref: 1200.00,
          capacidad: "7m3 por viaje",
          estimado_viajes_por_m2: 0.08
        },
        "P11.02": {
          descripcion: "Limpieza general de obra: pisos, vidrios, herrajes, instalaciones",
          unidad: "m2",
          costo_unitario_ref: 35.00,
          rendimiento: "cuadrilla 2 personas: 150 m2/dia"
        },
        "P11.03": {
          descripcion: "Limpieza y protección de acabados premium (mármol, maderas, cancelería)",
          unidad: "servicio",
          costo_unitario_ref: 3500.00,
          nota: "Solo para proyectos con acabados de lujo"
        }
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // SECCIÓN 3 — FACTORES REGIONALES
  // Ajuste de costos por zona geográfica respecto a CDMX base=1.0
  // Fuente: CEICO-CMIC + INEGI índices por ciudad 2025
  // ─────────────────────────────────────────────────────────────
  factores_regionales: {
    descripcion: "Factor multiplicador sobre precio base zona CDMX. Base = 1.0",
    fuente: "CEICO-CMIC + INEGI índices construcción residencial por ciudad 2025",
    nota: "Aplicar sobre costo directo de materiales y mano de obra",
    zonas: {
      "CDMX":             { factor: 1.00, nota: "Base de referencia nacional" },
      "Puebla":           { factor: 0.92, nota: "Zona centro, materiales similares CDMX" },
      "Tlaxcala":         { factor: 0.89, nota: "Zona proyecto ObraDigitalMX, menor costo MO" },
      "Hidalgo":          { factor: 0.88, nota: "Zona Bajío norte, acceso materiales bueno" },
      "Queretaro":        { factor: 0.96, nota: "Alta demanda por nearshoring, MO competida" },
      "Guadalajara":      { factor: 0.95, nota: "Segundo mercado nacional" },
      "Monterrey":        { factor: 1.12, nota: "Mayor costo por demanda industrial nearshoring" },
      "Morelia":          { factor: 0.90, nota: "Zona centro occidente" },
      "Oaxaca":           { factor: 0.86, nota: "Menor demanda, MO más económica" },
      "Merida":           { factor: 0.93, nota: "Crecimiento acelerado 2024-2025" },
      "Tijuana":          { factor: 1.08, nota: "Alta demanda industrial, flete materiales" },
      "Veracruz":         { factor: 0.91, nota: "Zona costera, humedad agrega costo en acabados" },
      "SLP":              { factor: 0.92, nota: "San Luis Potosí, zona centro norte" },
      "Cancun":           { factor: 1.05, nota: "Turístico, costo flete y MO elevado" }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // SECCIÓN 4 — CUANTÍAS GLOBALES POR TIPO DE OBRA
  // Para cálculo paramétrico rápido
  // Fuente: CEICO-CMIC + INEGI-INPP 2025
  // ─────────────────────────────────────────────────────────────
  cuantias_globales: {
    descripcion: "Consumo típico de insumos clave por m2 de construcción. Base zona centro.",
    fuente: "CEICO-CMIC + práctica profesional verificada México",

    vivienda_interes_social: {
      cemento_bolsas_50kg_por_m2: 1.2,
      varilla_kg_por_m2: 18,
      block_15x20x40_piezas_por_m2: 8,
      concreto_premezclado_m3_por_m2: 0.18,
      cable_thw_12_ml_por_m2: 12,
      tubo_pvc_hid_ml_por_m2: 8,
      costo_directo_m2_ref: 10692,
      fuente: "CEICO-CMIC + ajuste +4.52pct 2025"
    },

    vivienda_media: {
      cemento_bolsas_50kg_por_m2: 1.4,
      varilla_kg_por_m2: 26,
      block_15x20x40_piezas_por_m2: 10,
      concreto_premezclado_m3_por_m2: 0.22,
      cable_thw_12_ml_por_m2: 18,
      tubo_pvc_hid_ml_por_m2: 12,
      costo_directo_m2_ref: 22489,
      fuente: "CEICO-CMIC + ajuste +4.52pct 2025"
    },

    vivienda_lujo: {
      cemento_bolsas_50kg_por_m2: 1.6,
      varilla_kg_por_m2: 35,
      concreto_premezclado_m3_por_m2: 0.28,
      costo_directo_m2_ref: 31279,
      fuente: "CEICO-CMIC + ajuste +4.52pct 2025"
    },

    local_comercial: {
      cemento_bolsas_50kg_por_m2: 1.3,
      varilla_kg_por_m2: 22,
      concreto_premezclado_m3_por_m2: 0.20,
      costo_directo_m2_ref: 18500,
      fuente: "Estimación CEICO-CMIC mercado zona centro"
    },

    nave_industrial: {
      cemento_bolsas_50kg_por_m2: 0.9,
      varilla_kg_por_m2: 15,
      concreto_premezclado_m3_por_m2: 0.14,
      costo_directo_m2_ref: 10642,
      fuente: "CEICO-CMIC + ajuste +4.52pct 2025"
    }
  },

  // ─────────────────────────────────────────────────────────────
  // SECCIÓN 5 — TIEMPOS DE EJECUCIÓN
  // Referencia para calcular duración de obra
  // ─────────────────────────────────────────────────────────────
  tiempos_ejecucion: {
    descripcion: "Duración estimada en semanas. Considera cuadrilla estándar y trabajo normal.",
    fuente: "Práctica profesional México + CEICO",

    formula: "semanas = (superficie_m2 / rendimiento_semanal) x factor_complejidad",

    rendimientos_semanales_m2: {
      vivienda_1_nivel: 12,
      vivienda_2_niveles: 9,
      vivienda_3_niveles: 7,
      local_comercial: 14,
      nave_industrial_simple: 20
    },

    factores_complejidad: {
      diseno_simple_rectangular: 1.0,
      diseno_irregular: 1.25,
      zona_dificil_acceso: 1.15,
      temporada_lluvias: 1.20,
      nota: "Multiplicar el tiempo base por estos factores cuando apliquen"
    },

    fases_tipicas_vivienda: {
      preliminares_y_cimentacion_pct: 15,
      estructura_y_albanileria_pct: 35,
      instalaciones_pct: 20,
      acabados_y_carpinteria_pct: 25,
      limpieza_y_entrega_pct: 5
    }
  },

  // ─────────────────────────────────────────────────────────────
  // SECCIÓN 6 — FORMATO OFICIAL DE PRESUPUESTO
  // Estructura para PDF profesional conforme a práctica México
  // ─────────────────────────────────────────────────────────────
  formato_presupuesto_profesional: {
    descripcion: "Estructura oficial de presupuesto para obra privada en México",
    fuente: "Práctica profesional + LOPSRM como referencia + NMX-C-495",

    secciones_obligatorias: {
      portada: {
        campos: [
          "Nombre del proyecto",
          "Tipo de obra (vivienda, comercial, etc.)",
          "Dirección y municipio",
          "Propietario o cliente",
          "Nombre del arquitecto o empresa",
          "Cédula profesional del arquitecto (si aplica)",
          "Fecha de elaboración",
          "Número de folio o presupuesto",
          "Vigencia (30 días naturales estándar)",
          "Versión del presupuesto"
        ]
      },

      datos_generales: {
        campos: [
          "Superficie total construida (m2)",
          "Superficie de desplante (m2)",
          "Número de niveles",
          "Sistema constructivo",
          "Nivel de acabados",
          "Régimen constructivo (autoprodución / contrato)",
          "Moneda (MXN)",
          "IVA incluido o excluido (especificar)"
        ]
      },

      catalogo_conceptos: {
        columnas: [
          "Clave (P01.01, P01.02...)",
          "Partida y concepto",
          "Unidad",
          "Cantidad",
          "Precio Unitario sin IVA",
          "Importe sin IVA"
        ],
        agrupacion: "Por partida P01 a P11",
        nota: "Los precios unitarios deben incluir: material + mano de obra + herramienta"
      },

      resumen_partidas: {
        descripcion: "Subtotal de cada partida P01 a P11",
        incluye: "Suma parcial por partida antes de indirectos"
      },

      integracion_final: {
        lineas: [
          { concepto: "Subtotal Costo Directo", valor: "suma P01 a P11" },
          { concepto: "Costos Indirectos (15%)", valor: "CD x 0.15" },
          { concepto: "Utilidad del Constructor (10%)", valor: "CD x 0.10" },
          { concepto: "Subtotal sin IVA", valor: "CD + CI + U" },
          { concepto: "IVA (16%)", valor: "subtotal x 0.16" },
          { concepto: "TOTAL GENERAL", valor: "subtotal + IVA" }
        ]
      },

      notas_y_condiciones: {
        textos_recomendados: [
          "Los precios incluyen material, mano de obra y herramienta menor.",
          "No incluye: proyecto ejecutivo, permisos de construcción, derechos de conexión a servicios ni estudio de mecánica de suelos.",
          "Precios sin IVA. El IVA se desglosará en la factura correspondiente.",
          "Vigencia del presupuesto: 30 días naturales a partir de la fecha de emisión.",
          "Los precios están sujetos a variación por incremento en materiales según INPP-INEGI.",
          "Precios de referencia zona: [indicar estado/ciudad].",
          "Fuentes de precios: CEICO-CMIC, INEGI-INPP, precios de mercado zona centro México 2026.",
          "Este presupuesto tiene carácter referencial. Para contrato formal, elaborar APU analíticos."
        ]
      },

      firmas: {
        campos: [
          "Elaboró: Nombre y firma del arquitecto",
          "Cédula profesional (si aplica)",
          "Fecha",
          "Autoriza / Acepta: Nombre y firma del cliente",
          "Fecha de aceptación"
        ]
      }
    },

    folio_formato: "ODM-[AÑO]-[NUMEROCONSECUTIVO]",
    ejemplo_folio: "ODM-2026-0001"
  },

  // ─────────────────────────────────────────────────────────────
  // SECCIÓN 7 — SYSTEM PROMPT PARA AGENTE IA
  // Texto exacto para configurar Gemini como agente experto
  // ─────────────────────────────────────────────────────────────
  system_prompt_agente: {
    descripcion: "Texto de configuración del agente IA para el chat de ObraDigitalMX",

    prompt_completo: "Eres el Asistente Experto de ObraDigitalMX, una herramienta de presupuestación de construcción para México. Tienes conocimiento profundo de: (1) Precios de materiales de construcción en México 2025-2026 zona centro (Puebla, Tlaxcala, CDMX, Bajío). (2) Rendimientos de mano de obra según CMIC. (3) Normas oficiales: LOPSRM, NTC-RCDF 2023, NOM-001-SEDE, NOM-002-CNA. (4) Costos paramétricos CEICO-CMIC 2025. (5) Estructura de presupuestos profesionales. Tu objetivo es ayudar a arquitectos, ingenieros, maestros de obra y propietarios a entender los costos de su obra, responder preguntas técnicas sobre materiales, y orientar sobre el proceso constructivo. Responde siempre en español. Sé conciso pero completo. Cuando el usuario te dé datos de su obra, calcula o estima costos usando los precios de la base de datos. Si no tienes certeza de un precio, indica el rango típico y recomienda verificar en el mercado local. Nunca inventes datos ni fuentes. Solo respondes temas de construcción, presupuestos y materiales en México.",

    contexto_dinamico: "Cuando el usuario tenga un presupuesto generado, agregar: 'Tengo acceso al presupuesto de tu obra: [tipo de proyecto], [superficie]m2, en [ciudad]. El total estimado es [monto]. ¿En qué partida o material quieres profundizar?'",

    restricciones: [
      "No dar asesoría legal ni financiera",
      "No inventar precios sin respaldo",
      "No responder temas ajenos a construcción",
      "No comprometerse a precios exactos sin visita de obra"
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────
  _metadata: {
    version: "1.0.0",
    fecha: "Abril 2026",
    autor: "ObraDigitalMX",
    total_partidas: 11,
    total_conceptos: 65,
    fuentes_oficiales: [
      "LOPSRM DOF 16-abr-2025",
      "RLOPSRM Arts. 185-220",
      "DOF-IMSS Acuerdo ACDO.AS2.HCT.280125/22.P.DIR 05-Feb-2025",
      "CEICO-CMIC Costos paramétricos oct-2024 + ajuste 2025",
      "INEGI-INPP Variaciones 2025",
      "UMA 2025 DOF 10-enero-2025",
      "NTC-RCDF 2023 Normas Técnicas Complementarias",
      "SICT Tabulador Costo Directo 2025",
      "CMIC Catálogo Costos Horarios Maquinaria 2025",
      "NOM-001-SEDE-2012 Instalaciones eléctricas",
      "NOM-002-CNA-2016 Instalaciones hidráulicas"
    ],
    nota: "Este archivo es la base de conocimiento técnico de ObraDigitalMX. Actualizar cuando cambien las fuentes oficiales. Próxima revisión: enero 2027."
  }
};
