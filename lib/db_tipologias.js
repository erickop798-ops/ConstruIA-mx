// ObraDigitalMX - Modulo 2: Tipologias y Factores de Impacto
// Multiplicadores que alteran el costo base de la "Caja Gris" por partida.
// Una casa unifamiliar es el valor base (1.00).
// CORREGIDO: const -> var (compatibilidad Windows file://)

var db_tipologias = {
  "vivienda_unifamiliar": {
    nombre: "Casa Unifamiliar",
    descripcion: "Vivienda independiente de 1 a 3 niveles.",
    factores: {
      estructura:       1.00,
      albanileria:      1.00,
      hidrosanitario:   1.00,
      electrico:        1.00,
      hvac_extraccion:  1.00,
      acabados:         1.00
    }
  },

  "departamentos": {
    nombre: "Edificio de Departamentos",
    descripcion: "Torre residencial (3 a 5 niveles promedio).",
    factores: {
      estructura:       1.15,
      albanileria:      1.05,
      hidrosanitario:   1.15,
      electrico:        1.10,
      hvac_extraccion:  1.00,
      acabados:         1.05
    }
  },

  "local_comercial": {
    nombre: "Local Comercial (Retail)",
    descripcion: "Espacio abierto para venta al publico, sin equipos industriales.",
    factores: {
      estructura:       1.05,
      albanileria:      0.70,
      hidrosanitario:   0.60,
      electrico:        1.50,
      hvac_extraccion:  2.00,
      acabados:         1.30
    }
  },

  "cafeteria": {
    nombre: "Cafeteria",
    descripcion: "Venta de alimentos ligeros y bebidas. Equipo semi-industrial.",
    factores: {
      estructura:       1.05,
      albanileria:      0.80,
      hidrosanitario:   2.00,
      electrico:        2.50,
      hvac_extraccion:  1.50,
      acabados:         1.50
    }
  },

  "restaurante": {
    nombre: "Restaurante",
    descripcion: "Cocina industrial completa, comedor y banos publicos.",
    factores: {
      estructura:       1.10,
      albanileria:      0.90,
      hidrosanitario:   3.50,
      electrico:        4.00,
      hvac_extraccion:  5.00,
      acabados:         1.80
    } // 
  },

  "fit_out_comercial": {
    nombre: "Acondicionamiento Interior (Fit-out)",
    descripcion: "Adecuacion de local rentado en obra gris. Cero estructura.",
    factores: {
      estructura:       0.00, 
      albanileria:      0.30, 
      hidrosanitario:   0.60, 
      electrico:        2.00, 
      hvac_extraccion:  3.00, 
      acabados:         1.80  
    }
  },
  
  "departamentos_premium": {
    nombre: "Torre de Departamentos (Premium)",
    descripcion: "Edificio con amenidades, elevador y sotano de estacionamiento.",
    factores: {
      estructura:       1.40, 
      albanileria:      1.10,
      hidrosanitario:   1.30, 
      electrico:        1.25,
      hvac_extraccion:  1.50,
      acabados:         1.60  
    }
  }
};

// Sub-modulo: Factores de Calidad (nivel socioeconomico)
// Multiplica unicamente la partida de ACABADOS y EQUIPAMIENTO.
var db_factores_calidad = {
  "economico": {
    nombre: "Interes Social / Basico",
    factor_acabados: 0.70
  },
  "estandar": {
    nombre: "Medio / Residencial",
    factor_acabados: 1.00
  },
  "premium": {
    nombre: "Lujo / Premium",
    factor_acabados: 1.60
  }
};