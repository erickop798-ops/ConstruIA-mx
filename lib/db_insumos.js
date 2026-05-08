// ObraDigitalMX - Catalogo Base de Insumos 2025-2026
// Zona Centro: Promedio CDMX / Puebla / Tlaxcala / Bajio. Sin IVA.
// Salarios incluyen Factor de Salario Real (FASAR 1.65) basado en UMA 2025: $113.14/dia
// Fuentes verificadas:
//   - CEICO-CMIC Centro Nacional de Ingenieria de Costos (oct 2024 + ajuste 2025)
//   - INEGI Indice Nacional de Precios Productor (INPP)
//   - DOF-IMSS Costos de mano de obra Feb 2025
//   - Lifi Herramientas / IMIE SAS - Precios mercado Bajio/Centro Mar 2026
//   - Opus Planet / CEICO-CMIC Parametricos Mar 2026
// Inflacion 2025: materiales +4.28%, mano de obra +5.98%, maquinaria +1.34%
// IMPORTANTE: var siempre (compatibilidad Windows file://)

var db_insumos = {

  // ─────────────────────────────────────────────────────────────
  // COSTOS PARAMETRICOS DE REFERENCIA (CEICO-CMIC 2025)
  // Costo DIRECTO por m2. Sin IVA, sin indirectos, sin utilidad,
  // sin terreno, sin proyecto ejecutivo, sin licencias.
  // Para costo total del proyecto: multiplicar x 1.35 a 1.50
  // ─────────────────────────────────────────────────────────────
  costos_parametricos: {
    "vivienda_interes_social":  { costo_m2: 10692.00, unidad: "m2 construido", descripcion: "Vivienda interes social. Costo directo referencia 2025", fuente: "CEICO-CMIC oct2024 + ajuste +4.52pct anual 2025" },
    "vivienda_media_semilujo":  { costo_m2: 22489.00, unidad: "m2 construido", descripcion: "Vivienda media / semilujo. Costo directo referencia 2025", fuente: "CEICO-CMIC oct2024 + ajuste +4.52pct anual 2025" },
    "vivienda_lujo":            { costo_m2: 31279.00, unidad: "m2 construido", descripcion: "Vivienda de lujo. Costo directo referencia 2025", fuente: "CEICO-CMIC oct2024 + ajuste +4.52pct anual 2025" },
    "edificio_oficinas_lujo":   { costo_m2: 29905.00, unidad: "m2 construido", descripcion: "Edificio de oficinas nivel lujo. Costo directo referencia 2025", fuente: "CEICO-CMIC oct2024 + ajuste +4.52pct anual 2025" },
    "hospital":                 { costo_m2: 23504.00, unidad: "m2 construido", descripcion: "Hospital / clinica. Costo directo referencia 2025", fuente: "CEICO-CMIC oct2024 + ajuste +4.52pct anual 2025" },
    "nave_industrial":          { costo_m2: 10642.00, unidad: "m2 construido", descripcion: "Nave industrial estandar (9-12m altura). Costo directo 2025", fuente: "CEICO-CMIC oct2024 + ajuste +4.52pct anual 2025" },
    "local_comercial":          { costo_m2: 18500.00, unidad: "m2 construido", descripcion: "Local comercial acabados estandar. Estimacion zona centro 2025", fuente: "Estimacion basada en CEICO-CMIC mercado zona centro" }
  },

  // ─────────────────────────────────────────────────────────────
  // MATERIALES BASE
  // Precios actualizados a Mar 2026 - Zona Bajio/Centro
  // ─────────────────────────────────────────────────────────────
  materiales_base: {
    "cemento_cpc30r":           { precio: 255.00,  precio_min: 245.00, precio_max: 265.00, unidad: "bolsa 50kg",        descripcion: "Cemento Portland CPC 30R (Tolteca/Holcim/Cruz Azul). Uso: losas, columnas, trabes", fuente: "Lifi/IMIE SAS Mar 2026" },
    "cemento_cpc30r_tonelada":  { precio: 4775.00, precio_min: 4600.00, precio_max: 4950.00, unidad: "tonelada 20 bultos", descripcion: "Cemento CPC 30R por tonelada. Ahorro aprox 12pct vs precio unitario", fuente: "Lifi/IMIE SAS Mar 2026" },
    "cemento_cpc40":            { precio: 275.00,  unidad: "bolsa 50kg",        descripcion: "Cemento Portland CPC 40 alta resistencia" },
    "mortero_premezclado":      { precio: 195.00,  precio_min: 185.00, precio_max: 210.00, unidad: "bolsa 40kg",        descripcion: "Mortero / mezcla (Calidra). Uso: aplanados, pegado de block", fuente: "Lifi/IMIE SAS Mar 2026" },
    "mortero_tonelada":         { precio: 3675.00, precio_min: 3500.00, precio_max: 3850.00, unidad: "tonelada",         descripcion: "Mortero por tonelada. Ahorro en pedido grande", fuente: "Lifi/IMIE SAS Mar 2026" },
    "cal_hidratada":            { precio: 97.00,   unidad: "bolsa 20kg",        descripcion: "Cal hidratada para construccion" },
    "yeso_construccion":        { precio: 85.00,   unidad: "bolsa 20kg",        descripcion: "Yeso para aplanados interiores" },
    "arena_fina":               { precio: 400.00,  unidad: "m3",                descripcion: "Arena de rio cribada para mezclas" },
    "arena_gruesa":             { precio: 370.00,  unidad: "m3",                descripcion: "Arena gruesa para morteros y concreto" },
    "grava_19mm":               { precio: 430.00,  unidad: "m3",                descripcion: "Grava triturada 19mm (3/4 pulg)" },
    "grava_38mm":               { precio: 410.00,  unidad: "m3",                descripcion: "Grava triturada 38mm (1.5 pulg) para rellenos" },
    "tepetate_relleno":         { precio: 180.00,  unidad: "m3",                descripcion: "Tepetate o tierra para relleno compactado" },
    "block_15x20x40":           { precio: 18.50,   unidad: "pieza",             descripcion: "Block hueco de concreto 15x20x40 cm" },
    "block_10x20x40":           { precio: 14.50,   unidad: "pieza",             descripcion: "Block hueco de concreto 10x20x40 cm divisorio" },
    "block_20x20x40":           { precio: 22.00,   unidad: "pieza",             descripcion: "Block hueco de concreto 20x20x40 cm muro resistente" },
    "tabique_rojo":             { precio: 6.50,    unidad: "pieza",             descripcion: "Tabique rojo recocido 7x14x28 cm" },
    "tabique_artesanal":        { precio: 4.80,    unidad: "pieza",             descripcion: "Tabique artesanal / de barro regional" },
    "panel_yeso_estandar":      { precio: 190.00,  unidad: "pieza",             descripcion: "Tablaroca estandar 1.22x2.44m" },
    "panel_yeso_humedad":       { precio: 240.00,  unidad: "pieza",             descripcion: "Tablaroca resistente a humedad bano/cocina 1.22x2.44m" },
    "concreto_f200":            { precio: 2250.00, unidad: "m3",                descripcion: "Concreto premezclado fc=200 kg/cm2" },
    "concreto_f250":            { precio: 2450.00, unidad: "m3",                descripcion: "Concreto premezclado fc=250 kg/cm2" },
    "concreto_f300":            { precio: 2700.00, unidad: "m3",                descripcion: "Concreto premezclado fc=300 kg/cm2 alta resistencia" },
    "piedra_braza":             { precio: 320.00,  unidad: "m3",                descripcion: "Piedra braza para cimentacion / mamposteria" },
    "plantilla_concreto":       { precio: 1850.00, unidad: "m3",                descripcion: "Concreto simple fc=100 para plantilla de cimentacion" }
  },

  // ─────────────────────────────────────────────────────────────
  // ACERO Y METALICOS
  // NOTA: Material MAS VOLATILE - confirmar precio antes de comprar
  // Verificar: sin oxidacion escamosa, corrugado uniforme
  // Grado 42 es el estandar minimo estructural en zona sismica centro Mexico
  // Compra por tonelada ahorra 10-15% vs precio unitario
  // ─────────────────────────────────────────────────────────────
  acero: {
    "alambron_1_4_kg":          { precio: 30.00,   precio_min: 28.00, precio_max: 32.00, unidad: "kg",              descripcion: "Alambron 1/4 pulg por kg. Uso: refuerzo ligero y amarres", fuente: "Lifi/IMIE SAS Mar 2026" },
    "varilla_1_4":              { precio: 95.00,   unidad: "pieza 12m", peso_kg: 2.98,   descripcion: "Varilla corrugada No.2 (1/4 pulg)" },
    "varilla_3_8":              { precio: 195.00,  precio_min: 185.00, precio_max: 205.00, unidad: "pieza 12m", peso_kg_m: 0.560, descripcion: "Varilla corrugada No.3 (3/8 pulg) Grado 42. Estandar minimo estructural zona sismica", fuente: "Lifi/IMIE SAS Mar 2026" },
    "varilla_1_2":              { precio: 310.00,  precio_min: 295.00, precio_max: 325.00, unidad: "pieza 12m", peso_kg_m: 0.994, descripcion: "Varilla corrugada No.4 (1/2 pulg) Grado 42", fuente: "Lifi/IMIE SAS Mar 2026" },
    "varilla_5_8":              { precio: 440.00,  unidad: "pieza 12m", peso_kg: 18.65,  descripcion: "Varilla corrugada No.5 (5/8 pulg)" },
    "varilla_3_4":              { precio: 620.00,  unidad: "pieza 12m", peso_kg: 26.88,  descripcion: "Varilla corrugada No.6 (3/4 pulg)" },
    "acero_tonelada":           { precio: 27000.00, precio_min: 26500.00, precio_max: 28500.00, unidad: "ton",     descripcion: "Acero de refuerzo Grado 42 por tonelada. Precio muy volatil", fuente: "Lifi/IMIE SAS Mar 2026" },
    "malla_6x6_10_10":          { precio: 850.00,  unidad: "rollo 9m2",             descripcion: "Malla electrosoldada 6x6-10/10 para losa" },
    "malla_6x6_6_6":            { precio: 1150.00, unidad: "rollo 9m2",             descripcion: "Malla electrosoldada 6x6-6/6 losa resistente" },
    "alambre_recocido":         { precio: 380.00,  unidad: "rollo 30kg",            descripcion: "Alambre recocido Cal.16 para amarres de varilla" },
    "perfil_solera_38":         { precio: 85.00,   unidad: "tramo 3.66m",           descripcion: "Solera metalica 38mm para estructura tablaroca" },
    "perfil_canal_38":          { precio: 90.00,   unidad: "tramo 3.66m",           descripcion: "Canal metalico 38mm para estructura tablaroca" },
    "clavo_concreto":           { precio: 85.00,   unidad: "kg",                    descripcion: "Clavos de concreto varios diametros" }
  },

  // ─────────────────────────────────────────────────────────────
  // CIMENTACION Y ESTRUCTURA
  // ─────────────────────────────────────────────────────────────
  cimentacion_estructura: {
    "cimbra_madera_triplay":    { precio: 420.00,  unidad: "m2",       descripcion: "Cimbra de madera triplay para losa/trabe (renta+material)" },
    "poste_cimbra_acero":       { precio: 35.00,   unidad: "dia pieza",descripcion: "Poste telescopico de acero para cimbra (renta diaria)" },
    "losacero_cal22":           { precio: 180.00,  unidad: "m2",       descripcion: "Losacero / lamina colaborante galvanizada calibre 22" },
    "castillo_12x12":           { precio: 185.00,  unidad: "ml",       descripcion: "Castillo 12x12 cm armado fc=200 (material+mano obra)" },
    "cadena_15x20":             { precio: 220.00,  unidad: "ml",       descripcion: "Cadena de cerramiento 15x20 cm fc=200 (material+mano obra)" },
    "dala_15x15":               { precio: 195.00,  unidad: "ml",       descripcion: "Dala de concreto 15x15 cm (material+mano obra)" },
    "columna_20x20":            { precio: 850.00,  unidad: "ml",       descripcion: "Columna 20x20 cm concreto armado fc=250 (material+mano obra)" },
    "trabe_20x30":              { precio: 1100.00, unidad: "ml",       descripcion: "Trabe 20x30 cm concreto armado fc=250 (material+mano obra)" },
    "losa_maciza_10cm":         { precio: 980.00,  unidad: "m2",       descripcion: "Losa maciza e=10cm concreto fc=200 (material+mano obra)" },
    "losa_vigueta_bovedilla":   { precio: 750.00,  unidad: "m2",       descripcion: "Losa vigueta y bovedilla prefabricada instalada" },
    "excavacion_manual":        { precio: 320.00,  unidad: "m3",       descripcion: "Excavacion a mano en terreno normal" },
    "excavacion_maquina":       { precio: 180.00,  unidad: "m3",       descripcion: "Excavacion con retroexcavadora terreno blando" },
    "relleno_compactado":       { precio: 280.00,  unidad: "m3",       descripcion: "Relleno y compactacion manual por capas" }
  },

  // ─────────────────────────────────────────────────────────────
  // ACABADOS
  // ─────────────────────────────────────────────────────────────
  acabados: {
    "piso_economico":           { precio: 160.00,  unidad: "m2",          descripcion: "Ceramica estandar 45x45 cm" },
    "piso_estandar":            { precio: 310.00,  unidad: "m2",          descripcion: "Porcelanato 60x60 cm" },
    "piso_premium":             { precio: 950.00,  unidad: "m2",          descripcion: "Marmol o gran formato lujo" },
    "piso_madera_laminada":     { precio: 420.00,  unidad: "m2",          descripcion: "Piso laminado madera AC3 instalado" },
    "piso_concreto_pulido":     { precio: 380.00,  unidad: "m2",          descripcion: "Piso de concreto pulido y endurecido" },
    "piso_azulejo_bano":        { precio: 220.00,  unidad: "m2",          descripcion: "Azulejo para bano 30x60 cm" },
    "azulejo_cocina":           { precio: 185.00,  unidad: "m2",          descripcion: "Azulejo para cocina / salpicadero 20x30 cm" },
    "aplanado_yeso_interior":   { precio: 180.00,  unidad: "m2",          descripcion: "Aplanado de yeso en muro interior 15mm" },
    "aplanado_cemento_ext":     { precio: 220.00,  unidad: "m2",          descripcion: "Aplanado de cemento-arena en exterior 20mm" },
    "pintura_vinilica":         { precio: 650.00,  unidad: "cubeta 19L",  rendimiento_m2: 35, descripcion: "Pintura interior vinilica 2 manos" },
    "pintura_exterior":         { precio: 780.00,  unidad: "cubeta 19L",  rendimiento_m2: 30, descripcion: "Pintura exterior elastomerica" },
    "pintura_epoxica":          { precio: 1450.00, unidad: "cubeta 19L",  rendimiento_m2: 25, descripcion: "Pintura epoxica alto trafico comercio/sotanos" },
    "impermeabilizante":        { precio: 850.00,  unidad: "cubeta 19L",  rendimiento_m2: 19, descripcion: "Impermeabilizante acrilico 5 anios garantia" },
    "impermeabilizante_10":     { precio: 1250.00, unidad: "cubeta 19L",  rendimiento_m2: 16, descripcion: "Impermeabilizante premium 10 anios" },
    "muro_tablaroca_sencillo":  { precio: 280.00,  unidad: "m2",          descripcion: "Muro divisorio Tablaroca cara sencilla no estructural" },
    "muro_tablaroca_doble":     { precio: 380.00,  unidad: "m2",          descripcion: "Muro divisorio Tablaroca doble cara + aislante acustico" },
    "plafon_reticular":         { precio: 290.00,  unidad: "m2",          descripcion: "Plafon reticular comercial falso techo c/suspension" },
    "plafon_tablaroca":         { precio: 320.00,  unidad: "m2",          descripcion: "Plafon de tablaroca sobre estructura metalica" },
    "rodapie_ceramico":         { precio: 95.00,   unidad: "ml",          descripcion: "Rodapie ceramico 8x45 cm instalado" },
    "firme_concreto_8cm":       { precio: 320.00,  unidad: "m2",          descripcion: "Firme de concreto fc=150 e=8cm sobre terreno" },
    "zoclo_aluminio":           { precio: 145.00,  unidad: "ml",          descripcion: "Zoclo de aluminio anodizado instalado" }
  },

  // ─────────────────────────────────────────────────────────────
  // CUBIERTAS Y TECHOS
  // ─────────────────────────────────────────────────────────────
  cubiertas: {
    "teja_barro":               { precio: 28.00,   unidad: "pieza",    descripcion: "Teja de barro colonial instalada" },
    "lamina_galvanizada_r72":   { precio: 185.00,  unidad: "ml",       descripcion: "Lamina galvanizada R-72 Cal.26 por metro lineal" },
    "lamina_acanalada_cal30":   { precio: 95.00,   unidad: "m2",       descripcion: "Lamina acanalada galvanizada Cal.30" },
    "lamina_policarbonato":     { precio: 340.00,  unidad: "m2",       descripcion: "Lamina policarbonato 6mm instalada" },
    "membrana_asfaltica":       { precio: 280.00,  unidad: "m2",       descripcion: "Membrana asfaltica autoadherible para azotea" },
    "canal_pluvial_pvc":        { precio: 145.00,  unidad: "ml",       descripcion: "Canal pluvial PVC 15cm instalado" },
    "bajada_pluvial_pvc":       { precio: 95.00,   unidad: "ml",       descripcion: "Bajada pluvial PVC 10cm instalada" },
    "pendiente_tepetate":       { precio: 280.00,  unidad: "m3",       descripcion: "Formacion de pendiente con tepetate compactado" }
  },

  // ─────────────────────────────────────────────────────────────
  // CARPINTERIA Y CANCELERIA
  // ─────────────────────────────────────────────────────────────
  carpinteria_canceleria: {
    "puerta_madera_estandar":   { precio: 3800.00,  unidad: "pieza", descripcion: "Puerta madera solida 0.90x2.10m con marco y bisagras" },
    "puerta_madera_principal":  { precio: 8500.00,  unidad: "pieza", descripcion: "Puerta principal madera solida 1.00x2.10m c/herraje" },
    "puerta_metalica":          { precio: 4500.00,  unidad: "pieza", descripcion: "Puerta metalica 0.90x2.10m c/marco y chapa" },
    "puerta_vidrio_aluminio":   { precio: 6800.00,  unidad: "pieza", descripcion: "Puerta de vidrio y aluminio 0.90x2.10m corrediza" },
    "ventana_aluminio_sencilla":{ precio: 1850.00,  unidad: "m2",    descripcion: "Ventana de aluminio natural vidrio 6mm" },
    "ventana_aluminio_premium": { precio: 2800.00,  unidad: "m2",    descripcion: "Ventana aluminio anodizado doble vidrio" },
    "cancel_bano":              { precio: 3200.00,  unidad: "pieza", descripcion: "Cancel de bano aluminio y vidrio templado" },
    "herreria_ventana":         { precio: 1200.00,  unidad: "m2",    descripcion: "Ventana de herreria con vidrio sencillo" },
    "portone_herrero_2h":       { precio: 12500.00, unidad: "pieza", descripcion: "Porton de herreria 2 hojas 3.00x2.20m c/pintura" },
    "barandal_herreria":        { precio: 1800.00,  unidad: "ml",    descripcion: "Barandal de herreria con pintura anticorrosiva" },
    "closet_madera_3m":         { precio: 9500.00,  unidad: "pieza", descripcion: "Closet de madera MDF 3m ancho puertas corredizas" },
    "cocina_integral_ml":       { precio: 8500.00,  unidad: "ml",    descripcion: "Cocina integral MDF con cubierta y herrajes" }
  },

  // ─────────────────────────────────────────────────────────────
  // INSTALACIONES HIDRAULICAS Y SANITARIAS
  // COMPARATIVA TUBERIAS (Mar 2026):
  // PVC:  agua fria, economico, union pegamento azul
  // CPVC: agua fria y caliente, union pegamento naranja especial
  // PPR:  alta presion/temperatura, union termofusion 260C (RECOMENDADO - cero fugas)
  // PPR costo similar a PVC pero ventaja: una sola pieza soldada, no depende del pegamento
  // ─────────────────────────────────────────────────────────────
  instalaciones_hidro_sanitarias: {
    "tubo_pvc_san_4":           { precio: 215.00,  unidad: "tramo 6m",   descripcion: "Tubo PVC Sanitario 102mm (4 pulg) drenaje principal" },
    "tubo_pvc_san_3":           { precio: 155.00,  unidad: "tramo 6m",   descripcion: "Tubo PVC Sanitario 76mm (3 pulg)" },
    "tubo_pvc_san_2":           { precio: 98.00,   unidad: "tramo 6m",   descripcion: "Tubo PVC Sanitario 51mm (2 pulg) ramales" },
    "tubo_pvc_hid_1_2":         { precio: 98.00,   precio_min: 85.00, precio_max: 110.00, unidad: "tramo 4m", descripcion: "Tubo PVC hidraulico 13mm (1/2 pulg) agua fria. Union: cemento azul", fuente: "Lifi/IMIE SAS Mar 2026" },
    "tubo_pvc_hid_3_4":         { precio: 145.00,  unidad: "tramo 4m",   descripcion: "Tubo PVC hidraulico 19mm (3/4 pulg) agua fria" },
    "tubo_pvc_hid_1":           { precio: 210.00,  unidad: "tramo 4m",   descripcion: "Tubo PVC hidraulico 25mm (1 pulg) alimentacion principal" },
    "tubo_cpvc_1_2":            { precio: 178.00,  precio_min: 160.00, precio_max: 195.00, unidad: "tramo 4m", descripcion: "Tubo CPVC 13mm (1/2 pulg) agua caliente. Union: cemento naranja especial", fuente: "Lifi/IMIE SAS Mar 2026" },
    "tubo_cpvc_3_4":            { precio: 195.00,  unidad: "tramo 4m",   descripcion: "Tubo CPVC 19mm (3/4 pulg) agua caliente" },
    "tubo_ppr_1_2":             { precio: 108.00,  precio_min: 95.00, precio_max: 120.00, unidad: "tramo 4m", descripcion: "Tubo PPR verde 13mm (1/2 pulg) termofusion. Cero fugas, alta presion. Recomendado sobre CPVC", fuente: "Lifi/IMIE SAS Mar 2026" },
    "tubo_ppr_3_4":             { precio: 155.00,  unidad: "tramo 4m",   descripcion: "Tubo PPR verde 19mm (3/4 pulg) termofusion" },
    "tubo_ppr_1":               { precio: 220.00,  unidad: "tramo 4m",   descripcion: "Tubo PPR verde 25mm (1 pulg) termofusion alimentacion" },
    "wc_estandar":              { precio: 2800.00, unidad: "pieza",      descripcion: "WC / Inodoro estandar blanco instalado" },
    "wc_doble_descarga":        { precio: 4500.00, unidad: "pieza",      descripcion: "WC doble descarga ahorro de agua instalado" },
    "lavabo_estandar":          { precio: 1800.00, unidad: "pieza",      descripcion: "Lavabo de sobreponer estandar blanco instalado" },
    "regadera_sencilla":        { precio: 1200.00, unidad: "pieza",      descripcion: "Regadera sencilla con mezcladora instalada" },
    "tina_bano":                { precio: 6500.00, unidad: "pieza",      descripcion: "Tina de bano acrilica 1.50m instalada" },
    "llaves_lavabo":            { precio: 850.00,  unidad: "juego",      descripcion: "Juego de llaves para lavabo instalado" },
    "llaves_fregadero":         { precio: 1100.00, unidad: "juego",      descripcion: "Juego de llaves para fregadero instalado" },
    "cisterna_mamposteria":     { precio: 18500.00, unidad: "pieza",     descripcion: "Cisterna de mamposteria 5000L c/impermeabilizacion" },
    "tinaco_450l":              { precio: 1800.00, unidad: "pieza",      descripcion: "Tinaco polietileno 450L instalado" },
    "tinaco_1100l":             { precio: 3200.00, unidad: "pieza",      descripcion: "Tinaco polietileno 1100L instalado" },
    "bomba_1hp":                { precio: 4500.00, unidad: "pieza",      descripcion: "Bomba centrifuga 1HP instalada con tablero" },
    "registro_albanal":         { precio: 1800.00, unidad: "pieza",      descripcion: "Registro de albanal 60x60cm mamposteria con tapa" },
    "fosa_septica_2000l":       { precio: 12000.00, unidad: "pieza",     descripcion: "Fosa septica prefabricada 2000L instalada" }
  },

  // ─────────────────────────────────────────────────────────────
  // INSTALACIONES ELECTRICAS
  // Precios actualizados Mar 2026 - Zona Bajio/Centro
  // NOTA CRITICA DE SEGURIDAD:
  // - Exigir certificacion NOM-001-SEDE grabada en el aislamiento
  // - EVITAR cable alucobre (aluminio banado en cobre): 40pct mas barato
  //   pero provoca sobrecalentamiento y riesgo de incendio
  // - Marcas certificadas recomendadas: Condumex, IUSA, Viakon
  // ─────────────────────────────────────────────────────────────
  instalaciones_electricas: {
    "cable_thw_14":             { precio: 915.00,  precio_min: 850.00,  precio_max: 980.00,  unidad: "rollo 100m", amp: "15A", descripcion: "Cable THW cal.14 - alumbrado y circuitos generales vivienda. Certificado NOM-001-SEDE", fuente: "Lifi/IMIE SAS Mar 2026" },
    "cable_thw_12":             { precio: 1265.00, precio_min: 1180.00, precio_max: 1350.00, unidad: "rollo 100m", amp: "20A", descripcion: "Cable THW cal.12 - contactos cocina y herramientas alto consumo. Certificado NOM-001-SEDE", fuente: "Lifi/IMIE SAS Mar 2026" },
    "cable_thw_10":             { precio: 1775.00, precio_min: 1650.00, precio_max: 1900.00, unidad: "rollo 100m", amp: "30A", descripcion: "Cable THW cal.10 - aires acondicionados y centros de carga. Certificado NOM-001-SEDE", fuente: "Lifi/IMIE SAS Mar 2026" },
    "cable_thw_8":              { precio: 3400.00, unidad: "rollo 100m", descripcion: "Cable THW cal.8 - acometida / cocina industrial" },
    "cable_trifasico_8":        { precio: 4200.00, unidad: "rollo 100m", descripcion: "Cable uso rudo trifasico cal.8 para equipos" },
    "cable_trifasico_6":        { precio: 5200.00, unidad: "rollo 100m", descripcion: "Cable uso rudo trifasico cal.6 para equipos mayores" },
    "tablero_8_circuitos":      { precio: 2800.00, unidad: "pieza",      descripcion: "Tablero de distribucion 8 circuitos con interruptores" },
    "tablero_16_circuitos":     { precio: 4500.00, unidad: "pieza",      descripcion: "Tablero de distribucion 16 circuitos con interruptores" },
    "kit_salida_electrica":     { precio: 380.00,  unidad: "salida",     descripcion: "Salida electrica completa: poliducto, chalupa, cable y placa" },
    "apagador_sencillo":        { precio: 180.00,  unidad: "pieza",      descripcion: "Apagador sencillo instalado con placa" },
    "apagador_doble":           { precio: 250.00,  unidad: "pieza",      descripcion: "Apagador doble instalado con placa" },
    "contacto_doble":           { precio: 220.00,  unidad: "pieza",      descripcion: "Contacto doble polarizado instalado con placa" },
    "contacto_tierra_fisica":   { precio: 280.00,  unidad: "pieza",      descripcion: "Contacto con tierra fisica bano/cocina/AC. Obligatorio NOM" },
    "luminaria_panel_led":      { precio: 650.00,  unidad: "pieza",      descripcion: "Panel LED 60x60 cm comercial 40W instalado" },
    "luminaria_led_casa":       { precio: 350.00,  unidad: "pieza",      descripcion: "Luminaria LED empotrada casa 15W instalada" },
    "poliducto_1_2":            { precio: 12.00,   unidad: "ml",         descripcion: "Poliducto flexible naranja 1/2 pulg para cableado" },
    "conduit_emt_3_4":          { precio: 85.00,   unidad: "tramo 3m",   descripcion: "Conduit EMT rigido galvanizado 3/4 pulg" },
    "ducto_hvac_m2":            { precio: 550.00,  unidad: "m2",         descripcion: "Ducteria lamina galvanizada para Aire Acondicionado" },
    "salida_rociador":          { precio: 850.00,  unidad: "salida",     descripcion: "Salida para aspersor sprinkler red contra incendio NTC" }
  },

  // ─────────────────────────────────────────────────────────────
  // MANO DE OBRA
  // FASAR 1.65 (UMA 2025: $113.14/dia). Fuente: DOF-IMSS Feb 2025
  // Inflacion mano de obra 2025: +5.98%
  // ─────────────────────────────────────────────────────────────
  mano_de_obra: {
    "peon":                     { precio_dia: 520.00,  unidad: "jornal", descripcion: "Peon general (SMG $315 x FSR 1.65)" },
    "oficial_albanil":          { precio_dia: 600.00,  unidad: "jornal", descripcion: "Albanil oficial (SMP $363 x FSR 1.65)" },
    "oficial_electricista":     { precio_dia: 590.00,  unidad: "jornal", descripcion: "Electricista oficial (SMP $356 x FSR 1.65)" },
    "oficial_plomero":          { precio_dia: 590.00,  unidad: "jornal", descripcion: "Plomero / Fontanero oficial (SMP $356 x FSR 1.65)" },
    "oficial_pintor":           { precio_dia: 575.00,  unidad: "jornal", descripcion: "Pintor oficial (SMP $349 x FSR 1.65)" },
    "oficial_carpintero":       { precio_dia: 610.00,  unidad: "jornal", descripcion: "Carpintero / Herrero oficial" },
    "oficial_azulejero":        { precio_dia: 620.00,  unidad: "jornal", descripcion: "Colocador de pisos y azulejos oficial" },
    "oficial_soldador":         { precio_dia: 680.00,  unidad: "jornal", descripcion: "Soldador certificado" },
    "maestro_obra":             { precio_dia: 850.00,  unidad: "jornal", descripcion: "Maestro de obra / Cabo de oficios" },
    "residente_obra":           { precio_dia: 1800.00, unidad: "jornal", descripcion: "Residente de obra tecnico o ingeniero" }
  },

  // ─────────────────────────────────────────────────────────────
  // EQUIPAMIENTO ESPECIAL
  // ─────────────────────────────────────────────────────────────
  equipamiento_especial: {
    "elevador_pasajeros_4N":    { precio: 680000.00, unidad: "equipo", descripcion: "Elevador 6 personas (4 niveles) instalado y certificado" },
    "bomba_presurizadora_multi":{ precio: 28500.00,  unidad: "equipo", descripcion: "Sistema hidroneumatico para multifamiliar instalado" },
    "cisterna_prefabricada_10k":{ precio: 32000.00,  unidad: "equipo", descripcion: "Cisterna prefabricada 10000L instalada c/excavacion" },
    "minisplit_1_ton":          { precio: 8500.00,   unidad: "equipo", descripcion: "Aire Acondicionado Inverter 1 Tonelada instalado" },
    "minisplit_2_ton":          { precio: 14500.00,  unidad: "equipo", descripcion: "Aire Acondicionado Inverter 2 Toneladas instalado" },
    "calentador_gas_10l":       { precio: 3800.00,   unidad: "pieza",  descripcion: "Calentador de paso a gas 10L/min instalado" },
    "calentador_solar_200l":    { precio: 18000.00,  unidad: "pieza",  descripcion: "Calentador solar 200L con respaldo electrico instalado" },
    "panel_solar_400w":         { precio: 4200.00,   unidad: "pieza",  descripcion: "Panel solar 400W monocristalino instalado" },
    "generador_10kva":          { precio: 45000.00,  unidad: "equipo", descripcion: "Generador electrico 10 KVA a gas/diesel instalado" },
    "planta_tratamiento_5k":    { precio: 85000.00,  unidad: "equipo", descripcion: "Planta de tratamiento de aguas residuales 5000L/dia" }
  },

  // ─────────────────────────────────────────────────────────────
  // MAQUINARIA Y EQUIPO - RENTA DIARIA
  // ─────────────────────────────────────────────────────────────
  maquinaria_renta: {
    "retroexcavadora":          { precio_dia: 8500.00,   unidad: "dia",    descripcion: "Retroexcavadora 0.8m3 con operador" },
    "revolvedora_1_saco":       { precio_dia: 450.00,    unidad: "dia",    descripcion: "Revolvedora electrica 1 saco de cemento" },
    "vibrador_concreto":        { precio_dia: 380.00,    unidad: "dia",    descripcion: "Vibrador para concreto 1.5HP" },
    "andamio_tubular":          { precio_dia: 45.00,     unidad: "dia m2", descripcion: "Andamio tubular arrendado por m2 de fachada" },
    "cortadora_ceramico":       { precio_dia: 380.00,    unidad: "dia",    descripcion: "Cortadora de ceramico y porcelanato electrica" },
    "compactador_sapo":         { precio_dia: 850.00,    unidad: "dia",    descripcion: "Compactador tipo sapo para rellenos" },
    "termofusora_ppr":          { precio_dia: 450.00,    unidad: "dia",    descripcion: "Termofusora electrica 260C para union de tubo PPR" },
    "camion_volteo_7m3":        { precio_viaje: 1200.00, unidad: "viaje",  descripcion: "Camion de volteo 7m3 para acarreo de materiales" }
  },

  // ─────────────────────────────────────────────────────────────
  // METADATA DEL CATALOGO
  // ─────────────────────────────────────────────────────────────
  _metadata: {
    version: "2.1.0",
    fecha_actualizacion: "Marzo 2026",
    zona: "Centro Mexico (CDMX / Puebla / Tlaxcala / Bajio)",
    incluye_iva: false,
    fasar: 1.65,
    uma_2025_diaria: 113.14,
    total_categorias: 11,
    inflacion_anual_2025: {
      total_construccion: 0.0452,
      materiales: 0.0428,
      mano_de_obra: 0.0598,
      maquinaria: 0.0134
    },
    fuentes_verificadas: [
      "CEICO-CMIC Centro Nacional de Ingenieria de Costos oct2024 + ajuste 2025",
      "INEGI Indice Nacional de Precios Productor INPP",
      "DOF-IMSS Costos de mano de obra Feb 2025",
      "Lifi Herramientas / IMIE SAS Bajio/Centro Mar 2026",
      "Opus Planet / CEICO-CMIC Parametricos Mar 2026"
    ],
    nota_importante: "Precios de referencia para presupuestacion inicial. Para contratos formales elaborar APU analiticos. Acero: material mas volatil, confirmar precio antes de cada compra. Cable: exigir NOM-001-SEDE grabado en aislamiento.",
    nota_compra_volumen: "Cemento por tonelada (20 bultos) ahorra hasta 12pct. Varilla por tonelada ahorra 10-15pct. Flete puede agregar $5-10 por bulto en zonas de dificil acceso."
  }
};
