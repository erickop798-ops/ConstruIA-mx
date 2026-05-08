// ObraDigitalMX - Modulo 5: Motor Algoritmico de Calculo
// CORREGIDO: class -> objeto var, const -> var, arrow functions -> function(){}
// Compatible con Windows file:// y PowerShell (sin backticks, sin =>)

var MotorNeodata = {

  insumos: null,
  tipologias: null,
  factores_sict: null,
  apus: null,
  factores_calidad: null,
  porcentaje_indirectos: 0.18,
  porcentaje_utilidad: 0.10,

  inicializar: function(insumos, tipologias, factores_sict, apus, factores_calidad) {
    this.insumos = insumos;
    this.tipologias = tipologias;
    this.factores_sict = factores_sict;
    this.apus = apus;
    this.factores_calidad = factores_calidad;
  },

  obtenerPrecioInsumo: function(id_insumo, categoria) {
    if (this.insumos[categoria] && this.insumos[categoria][id_insumo]) {
      return this.insumos[categoria][id_insumo].precio;
    }
    return 0;
  },

  // --- NUEVO: Logica de Equipamiento Especial ---
  calcularCostosEspeciales: function(metros_cuadrados, niveles, id_tipologia) {
    var subtotalEspecial = 0;
    var detallesEspeciales = [];

    // 1. Departamentos
    if (id_tipologia === "departamentos_premium" || id_tipologia === "departamentos") {
      if (niveles >= 4) {
        var elevador = this.insumos.equipamiento_especial.elevador_pasajeros_4N;
        var hidroneumatico = this.insumos.equipamiento_especial.bomba_presurizadora_multi;
        
        subtotalEspecial = subtotalEspecial + elevador.precio;
        detallesEspeciales.push({ concepto: elevador.descripcion, costo: elevador.precio });
        
        subtotalEspecial = subtotalEspecial + hidroneumatico.precio;
        detallesEspeciales.push({ concepto: hidroneumatico.descripcion, costo: hidroneumatico.precio });
      }
      
      var cisterna = this.insumos.equipamiento_especial.cisterna_prefabricada_10k;
      subtotalEspecial = subtotalEspecial + cisterna.precio;
      detallesEspeciales.push({ concepto: cisterna.descripcion, costo: cisterna.precio });
    }

    // 2. Comercio
    if (id_tipologia === "fit_out_comercial" || id_tipologia === "local_comercial" || id_tipologia === "restaurante") {
      var toneladasNecesarias = Math.ceil(metros_cuadrados / 15);
      var equiposHVAC = Math.ceil(toneladasNecesarias / 2);
      var minisplit = this.insumos.equipamiento_especial.minisplit_2_toneladas;
      
      var costoHVAC = equiposHVAC * minisplit.precio;
      subtotalEspecial = subtotalEspecial + costoHVAC;
      detallesEspeciales.push({ concepto: equiposHVAC + "x " + minisplit.descripcion, costo: costoHVAC });

      if (metros_cuadrados > 50) {
        var cableado = this.insumos.instalaciones.cable_trifasico;
        subtotalEspecial = subtotalEspecial + cableado.precio;
        detallesEspeciales.push({ concepto: cableado.descripcion, costo: cableado.precio });
      }
    }

    return {
      subtotal: subtotalEspecial,
      desglose: detallesEspeciales
    };
  },

  // SE AGREGO LA VARIABLE "niveles" A LOS PARAMETROS
  calcularPresupuesto: function(metros_cuadrados, niveles, id_tipologia, id_estado, id_calidad) {

    var tipologia        = this.tipologias[id_tipologia].factores;
    var factor_regional  = this.factores_sict[id_estado];
    var factor_acabados  = this.factores_calidad[id_calidad].factor_acabados;
    var receta_base      = this.apus["construccion_base_m2"];

    var costo_directo_materiales_m2 = 0;
    var costo_directo_mo_m2         = 0;

    // --- Materiales ---
    var materiales = receta_base.materiales;
    for (var i = 0; i < materiales.length; i++) {
      var item = materiales[i];
      var precio_unitario = 0;

      if (this.insumos.materiales_base[item.id]) {
        precio_unitario = this.insumos.materiales_base[item.id].precio;
      } else if (this.insumos.acero[item.id]) {
        precio_unitario = this.insumos.acero[item.id].precio;
      } else if (this.insumos.instalaciones[item.id]) {
        precio_unitario = this.insumos.instalaciones[item.id].precio;
      }

      var costo_base          = item.cantidad * item.desperdicio * precio_unitario;
      var costo_regionalizado = costo_base * factor_regional.factor_mat;

      // Aplicar multiplicadores de tipologia
      if (item.id.indexOf("cable") >= 0 || item.id.indexOf("electrica") >= 0) {
        costo_regionalizado = costo_regionalizado * tipologia.electrico;
      } else if (item.id.indexOf("tubo") >= 0 || item.id.indexOf("sanitario") >= 0) {
        costo_regionalizado = costo_regionalizado * tipologia.hidrosanitario;
      } else if (item.id.indexOf("block") >= 0 || item.id.indexOf("cemento") >= 0) {
        costo_regionalizado = costo_regionalizado * tipologia.albanileria;
      }

      // Si la tipologia tiene factor estructura 0 (ej. Fit-out), cancelar concreto/acero
      if ((item.id.indexOf("concreto") >= 0 || item.id.indexOf("varilla") >= 0) && tipologia.estructura === 0) {
        costo_regionalizado = 0;
      } else if (item.id.indexOf("concreto") >= 0 || item.id.indexOf("varilla") >= 0) {
        costo_regionalizado = costo_regionalizado * tipologia.estructura;
      }

      costo_directo_materiales_m2 = costo_directo_materiales_m2 + costo_regionalizado;
    }

    // Comodin de Acabados (Pisos)
    var precio_piso      = this.insumos.acabados["piso_" + id_calidad].precio;
    var costo_acabados_m2 = 1.05 * 1.05 * precio_piso * factor_acabados * tipologia.acabados * factor_regional.factor_mat;
    costo_directo_materiales_m2 = costo_directo_materiales_m2 + costo_acabados_m2;

    // --- Mano de Obra ---
    var mo_items = receta_base.mano_obra;
    for (var j = 0; j < mo_items.length; j++) {
      var mo              = mo_items[j];
      var salario_real    = this.insumos.mano_de_obra[mo.id].precio_dia;
      var costo_mo_base   = salario_real / mo.rendimiento_m2_jornada;
      var costo_mo_reg    = costo_mo_base * factor_regional.factor_mo;
      
      // Cancelar mo estructural si es fit-out
      if (tipologia.estructura === 0 && mo.id.indexOf("albanil") >= 0) {
         costo_mo_reg = costo_mo_reg * tipologia.albanileria; 
      }
      
      costo_directo_mo_m2 = costo_directo_mo_m2 + costo_mo_reg;
    }

    // --- Calculo de Costos Especiales ---
    var extras = this.calcularCostosEspeciales(metros_cuadrados, niveles, id_tipologia);

    // --- Totales ---
    var costo_directo_total_m2  = costo_directo_materiales_m2 + costo_directo_mo_m2;
    var costo_directo_proyecto  = costo_directo_total_m2 * metros_cuadrados;
    
    // Sumar los equipos especiales (elevadores, HVAC, etc) al costo directo base
    var costo_directo_con_extras = costo_directo_proyecto + extras.subtotal;

    var total_indirectos        = costo_directo_con_extras * this.porcentaje_indirectos;
    var subtotal_con_indirectos = costo_directo_con_extras + total_indirectos;
    var total_utilidad          = subtotal_con_indirectos * this.porcentaje_utilidad;
    var presupuesto_final       = subtotal_con_indirectos + total_utilidad;

    return {
      metros_cuadrados:          metros_cuadrados,
      niveles:                   niveles,
      estado:                    this.factores_sict[id_estado].nombre,
      costo_directo_materiales:  costo_directo_materiales_m2 * metros_cuadrados,
      costo_directo_mano_obra:   costo_directo_mo_m2 * metros_cuadrados,
      equipamiento_especial:     extras.subtotal,
      desglose_especial:         extras.desglose,
      indirectos_y_ganancia:     total_indirectos + total_utilidad,
      presupuesto_total_mxn:     presupuesto_final,
      costo_parametrico_m2:      presupuesto_final / metros_cuadrados
    };
  }

};