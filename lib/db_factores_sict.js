// ObraDigitalMX - Modulo 3: Factores Regionales (Base SICT 2025)
// El valor 1.00 corresponde a la Zona Centro (CDMX).
// Multiplica los insumos y la mano de obra segun el estado seleccionado.
// CORREGIDO: const -> var (compatibilidad Windows file://)

var db_factores_sict = {
  "aguascalientes":      { nombre: "Aguascalientes",      factor_mat: 0.99, factor_mo: 0.98 },
  "baja_california":     { nombre: "Baja California",     factor_mat: 1.38, factor_mo: 1.46 },
  "baja_california_sur": { nombre: "Baja California Sur", factor_mat: 1.55, factor_mo: 1.50 },
  "campeche":            { nombre: "Campeche",            factor_mat: 1.16, factor_mo: 1.07 },
  "chiapas":             { nombre: "Chiapas",             factor_mat: 1.07, factor_mo: 1.00 },
  "chihuahua":           { nombre: "Chihuahua",           factor_mat: 1.12, factor_mo: 1.16 },
  "cdmx":                { nombre: "Ciudad de Mexico",    factor_mat: 1.00, factor_mo: 1.00 },
  "coahuila":            { nombre: "Coahuila",            factor_mat: 1.11, factor_mo: 1.14 },
  "colima":              { nombre: "Colima",              factor_mat: 1.06, factor_mo: 1.06 },
  "durango":             { nombre: "Durango",             factor_mat: 0.99, factor_mo: 0.99 },
  "estado_de_mexico":    { nombre: "Estado de Mexico",    factor_mat: 0.92, factor_mo: 0.91 },
  "guanajuato":          { nombre: "Guanajuato",          factor_mat: 1.05, factor_mo: 1.05 },
  "guerrero":            { nombre: "Guerrero",            factor_mat: 1.15, factor_mo: 1.08 },
  "hidalgo":             { nombre: "Hidalgo",             factor_mat: 0.99, factor_mo: 0.98 },
  "jalisco":             { nombre: "Jalisco",             factor_mat: 1.03, factor_mo: 1.03 },
  "michoacan":           { nombre: "Michoacan",           factor_mat: 1.19, factor_mo: 1.13 },
  "morelos":             { nombre: "Morelos",             factor_mat: 1.10, factor_mo: 1.10 },
  "nayarit":             { nombre: "Nayarit",             factor_mat: 1.15, factor_mo: 1.10 },
  "nuevo_leon":          { nombre: "Nuevo Leon",          factor_mat: 0.98, factor_mo: 1.01 },
  "oaxaca":              { nombre: "Oaxaca",              factor_mat: 1.11, factor_mo: 1.04 },
  "puebla":              { nombre: "Puebla",              factor_mat: 1.14, factor_mo: 1.15 },
  "queretaro":           { nombre: "Queretaro",           factor_mat: 1.07, factor_mo: 1.06 },
  "quintana_roo":        { nombre: "Quintana Roo",        factor_mat: 1.30, factor_mo: 1.22 },
  "san_luis_potosi":     { nombre: "San Luis Potosi",     factor_mat: 1.12, factor_mo: 1.08 },
  "sinaloa":             { nombre: "Sinaloa",             factor_mat: 1.08, factor_mo: 1.10 },
  "sonora":              { nombre: "Sonora",              factor_mat: 0.95, factor_mo: 0.98 },
  "tabasco":             { nombre: "Tabasco",             factor_mat: 1.11, factor_mo: 1.05 },
  "tamaulipas":          { nombre: "Tamaulipas",          factor_mat: 1.11, factor_mo: 1.14 },
  "tlaxcala":            { nombre: "Tlaxcala",            factor_mat: 0.99, factor_mo: 0.98 },
  "veracruz":            { nombre: "Veracruz",            factor_mat: 1.19, factor_mo: 1.14 },
  "yucatan":             { nombre: "Yucatan",             factor_mat: 1.11, factor_mo: 1.03 },
  "zacatecas":           { nombre: "Zacatecas",           factor_mat: 1.00, factor_mo: 1.01 }
};
