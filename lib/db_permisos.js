// ================================================================
// ObraDigitalMX — Base de Datos de Permisos de Construccion
// db_permisos.js — Version 2.0.0 — Abril 2026
// ================================================================
// REGLAS: var siempre. Sin let, const, backticks, arrow functions.
// FUENTES: Reglamentos de Construccion estatales y municipales
// 2025-2026. Requisitos referenciales. Verificar siempre con la
// dependencia local antes de tramitar. Actualizacion: Abril 2026.
// ================================================================

var DB_PERMISOS = {

  aguascalientes: {
    nombre: 'Aguascalientes',
    dependencia: 'IMPLAN / Direccion de Desarrollo Urbano Municipal',
    descripcion: 'Aguascalientes tiene un desarrollo industrial y habitacional acelerado. El Instituto Municipal de Planeacion (IMPLAN) gestiona los instrumentos de desarrollo urbano. Los tramites estan parcialmente digitalizados. Es uno de los estados con mejores tiempos de respuesta.',
    url: 'https://aguascalientes.gob.mx/tramites',
    tiempos: { obra_nueva: '15-25 dias habiles', remodelacion: '10-15 dias habiles' },
    costos: { obra_nueva: '$1,500 - $15,000 MXN segun m2', remodelacion: '$600 - $5,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Disponible en la Direccion de Desarrollo Urbano o plataforma digital del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Dictamen de uso de suelo e impacto urbano', descripcion: 'Emitido por IMPLAN Aguascalientes. Verifica compatibilidad y factibilidad.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos y estructurales con DRO', descripcion: 'DRO registrado ante el Colegio de Arquitectos Aguascalientes. Cedula profesional vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial al corriente', descripcion: 'Del ano en curso. Emitido por la Tesoreria del Municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Aguascalientes', descripcion: 'Registro Publico de la Propiedad. Folio real vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  baja_california: {
    nombre: 'Baja California',
    dependencia: 'IMPLAN / Direccion de Desarrollo Urbano Municipal',
    descripcion: 'Baja California incluye Tijuana, Mexicali, Ensenada y Tecate. Tijuana tiene tramites parcialmente digitalizados. Por la actividad industrial maquiladora en la franja fronteriza, los permisos para naves se procesan con relativa agilidad. Zona costera requiere autorizaciones adicionales.',
    url: 'https://tijuana.gob.mx/tramites/obras',
    tiempos: { obra_nueva: '20-40 dias habiles', remodelacion: '10-25 dias habiles' },
    costos: { obra_nueva: '$2,000 - $25,000 MXN segun m2', remodelacion: '$800 - $8,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato IMPLAN o municipal. Tijuana: plataforma TijuanaDigital.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Certificado de uso de suelo (Dictamen de uso)', descripcion: 'Emitido por IMPLAN o la Direccion de Planeacion Urbana Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos con DRO o responsiva profesional', descripcion: 'Con cedula profesional y registro municipal vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial del ano en curso', descripcion: 'Emitido por Catastro Municipal de Baja California.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Baja California', descripcion: 'Copia certificada con inscripcion vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Autorizacion SEMARNAT/ZOFEMAT (zona costera)', descripcion: 'Para predios en la franja costera de 20m desde la linea de marea alta.', obligatorio: false, tipo: 'obra_nueva' }
    ]
  },

  baja_california_sur: {
    nombre: 'Baja California Sur',
    dependencia: 'SEDUMA / Direccion de Desarrollo Urbano Municipal',
    descripcion: 'Los Cabos, La Paz y Loreto son los centros principales. Los Cabos tiene alta actividad constructiva turistica y residencial de alto nivel. Requiere autorizaciones especiales de SEMARNAT para zona costera. Agua es un recurso critico: se requiere factibilidad hidraulica.',
    url: 'https://bcs.gob.mx/tramites',
    tiempos: { obra_nueva: '25-50 dias habiles', remodelacion: '15-30 dias habiles' },
    costos: { obra_nueva: '$3,000 - $40,000 MXN segun m2', remodelacion: '$1,500 - $15,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato de la Direccion de Desarrollo Urbano del municipio. Los Cabos tiene plataforma en linea.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Dictamen de uso de suelo (SEDUMA)', descripcion: 'Secretaria de Desarrollo Urbano, Medio Ambiente y Obras Publicas de BCS.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Factibilidad hidraulica (agua y drenaje)', descripcion: 'CRITICO en BCS por escasez de agua. Emitida por OOMSAPASLC o el organismo operador local.', obligatorio: true, tipo: 'obra_nueva' },
      { doc: 'Planos arquitectonicos y estructurales con DRO', descripcion: 'Con cedula profesional. En Los Cabos se recomienda DRO con experiencia en zona costera.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial al corriente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP BCS', descripcion: 'Registro Publico de la Propiedad del Estado de Baja California Sur.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Autorizacion SEMARNAT o MIA (zona costera)', descripcion: 'Para proyectos en la zona federal maritimo-terrestre o areas de alto valor ambiental.', obligatorio: false, tipo: 'obra_nueva' }
    ]
  },

  campeche: {
    nombre: 'Campeche',
    dependencia: 'H. Ayuntamiento / Direccion de Desarrollo Urbano',
    descripcion: 'Campeche capital tiene el centro historico amurallado declarado Patrimonio de la Humanidad UNESCO. Cualquier obra en la zona de monumentos requiere visto bueno del INAH. Ciudad del Carmen es el segundo centro de actividad constructiva por la industria petrolera.',
    url: 'https://campeche.gob.mx/tramites',
    tiempos: { obra_nueva: '25-45 dias habiles', remodelacion: '15-30 dias habiles' },
    costos: { obra_nueva: '$1,200 - $12,000 MXN segun m2', remodelacion: '$500 - $4,500 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato del H. Ayuntamiento del municipio donde se ubica el predio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Uso de suelo compatible', descripcion: 'Emitido por la Direccion de Desarrollo Urbano del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Dictamen del INAH (zona historica)', descripcion: 'OBLIGATORIO para obras en la zona amurallada de Campeche o zonas de monumentos federales.', obligatorio: false, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO', descripcion: 'Con cedula profesional vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Campeche', descripcion: 'Registro Publico de la Propiedad del Estado.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  chiapas: {
    nombre: 'Chiapas',
    dependencia: 'SEOC / Direccion de Obras Publicas Municipal',
    descripcion: 'Chiapas opera principalmente con tramites municipales. San Cristobal de las Casas tiene zona de control historico-patrimonial. Tuxtla Gutierrez es el centro urbano mas activo. La normativa sismica es importante por la actividad tectonica del estado.',
    url: 'https://chiapas.gob.mx/tramites',
    tiempos: { obra_nueva: '25-50 dias habiles', remodelacion: '15-30 dias habiles' },
    costos: { obra_nueva: '$1,000 - $10,000 MXN segun m2', remodelacion: '$400 - $4,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Presidencia municipal o Direccion de Obras Publicas del H. Ayuntamiento.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de uso de suelo compatible', descripcion: 'Emitida por el municipio conforme al Plan Municipal de Ordenamiento Territorial.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos y calculo estructural', descripcion: 'Zona sismica activa. Se recomienda calculo estructural para cualquier obra de mas de 1 nivel.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal de Chiapas.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Chiapas', descripcion: 'Registro Publico de la Propiedad del Estado de Chiapas.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  chihuahua: {
    nombre: 'Chihuahua',
    dependencia: 'Direccion de Desarrollo Urbano y Ecologia Municipal',
    descripcion: 'Chihuahua y Ciudad Juarez son los principales centros de tramites. Ciudad Juarez, por su actividad industrial maquiladora, tiene procesos mas agiles para permisos de naves industriales. La norma NORCON aplica en todo el estado.',
    url: 'https://chihuahua.gob.mx/artmun/tramites',
    tiempos: { obra_nueva: '15-30 dias habiles', remodelacion: '10-20 dias habiles' },
    costos: { obra_nueva: '$1,800 - $22,000 MXN segun m2', remodelacion: '$700 - $7,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato municipal. En Chihuahua capital disponible en ventanilla y portal digital.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de uso de suelo', descripcion: 'Emitida por la Direccion de Desarrollo Urbano del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos y memoria descriptiva', descripcion: 'Firmados por arquitecto o ingeniero civil con cedula. DRO para obras mayores.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial del ano en curso', descripcion: 'Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Chihuahua', descripcion: 'Registro Publico de la Propiedad del Estado.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  cdmx: {
    nombre: 'Ciudad de Mexico (CDMX)',
    dependencia: 'SEDUVI / Alcaldia correspondiente',
    descripcion: 'En CDMX los tramites son digitales mediante la Ventanilla Unica de Construccion. Para obra mayor (mayor a 60 m2 o 2+ niveles) es obligatorio un Director Responsable de Obra (DRO) registrado ante SEDUVI. El costo de derechos se calcula sobre el valor catastral del predio.',
    url: 'https://tramites.cdmx.gob.mx',
    tiempos: { obra_nueva: '30-60 dias habiles', remodelacion: '15-30 dias habiles' },
    costos: { obra_nueva: '$5,000 - $80,000 MXN segun m2', remodelacion: '$2,000 - $20,000 MXN' },
    documentos: [
      { doc: 'Solicitud de Manifestacion de Construccion (Tipo A, B o C segun tamano)', descripcion: 'Tipo A: obra menor sin DRO. Tipo B: 61-5,000 m2 con DRO. Tipo C: mayor a 5,000 m2 con DRO y Corresponsables.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de Alineamiento y Numero Oficial vigente', descripcion: 'Define la linea de construccion respecto a la via publica. Se tramita en la Alcaldia.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Certificado Unico de Zonificacion de Uso de Suelo', descripcion: 'Verifica que el predio este permitido para el uso que se pretende construir. Emitido por SEDUVI.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Proyecto arquitectonico completo (5 tantos + version digital DWG)', descripcion: 'Incluye plantas, fachadas, cortes y detalles. Firmado por propietario, proyectista y DRO con cedula profesional.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Memoria descriptiva del proyecto', descripcion: 'Describe el proyecto, sistema constructivo, materiales y cumplimiento normativo. Firmada por DRO.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante de pago del Impuesto Predial al corriente', descripcion: 'No mayor a 3 meses de antiguedad. Obtenible en la Alcaldia o portal CDMX.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura o Titulo de Propiedad inscrito en el RPP', descripcion: 'Registro Publico de la Propiedad CDMX. Copia certificada notarial.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial vigente del propietario (INE/Pasaporte)', descripcion: 'Si firma un representante legal, se requiere poder notariado.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Memoria de calculo estructural firmada por Corresponsable', descripcion: 'Obligatoria para Manifestacion Tipo B y C. Demuestra resistencia sismica NTC-2023.', obligatorio: false, tipo: 'obra_nueva' },
      { doc: 'Estudio de mecanica de suelos', descripcion: 'Requerido para obras de mas de 4 niveles, sotanos o suelo blando de la zona lacustre.', obligatorio: false, tipo: 'obra_nueva' },
      { doc: 'Planos de instalaciones (electrica, hidraulica, sanitaria, gas)', descripcion: 'Con memorias descriptivas firmadas por Corresponsable en Instalaciones.', obligatorio: false, tipo: 'obra_nueva' },
      { doc: 'Poliza de seguro de responsabilidad civil vigente', descripcion: 'Requerida para obras mayores. Cubre danos a colindantes durante la construccion.', obligatorio: false, tipo: 'obra_nueva' }
    ]
  },

  coahuila: {
    nombre: 'Coahuila',
    dependencia: 'Secretaria de Obras Publicas Municipal / SDUOP',
    descripcion: 'Coahuila opera principalmente por municipios. Saltillo y Torreon son los mas activos. Torreon tiene ventanilla digital. Coahuila tiene el RESEC (Reglamento Estatal de Servicios de Edificacion y Construccion) que orienta a todos los municipios.',
    url: 'https://saltillo.gob.mx/obras',
    tiempos: { obra_nueva: '15-30 dias habiles', remodelacion: '10-20 dias habiles' },
    costos: { obra_nueva: '$2,000 - $20,000 MXN segun m2', remodelacion: '$800 - $6,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia o manifestacion de construccion', descripcion: 'Formato del municipio correspondiente. Saltillo y Torreon tienen plataforma en linea.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de uso de suelo compatible', descripcion: 'Emitida por la Direccion de Desarrollo Urbano del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos con DRO o responsiva', descripcion: 'Firmados por arquitecto o ingeniero civil con cedula profesional vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial al corriente', descripcion: 'Del ano en curso emitido por la Tesoreria Municipal de Coahuila.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura o titulo de propiedad', descripcion: 'Inscrita en el RPP del Estado de Coahuila.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial vigente del propietario', descripcion: 'INE/Pasaporte. Carta poder si firma apoderado.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  colima: {
    nombre: 'Colima',
    dependencia: 'Direccion de Desarrollo Urbano y Ecologia Municipal',
    descripcion: 'Colima es uno de los estados mas pequenos del pais y tiene los tramites mas agiles. Colima capital y Manzanillo (puerto) son los centros principales. Manzanillo tiene requisitos adicionales para zona portuaria y costera.',
    url: 'https://colima.gob.mx/tramites',
    tiempos: { obra_nueva: '10-25 dias habiles', remodelacion: '7-15 dias habiles' },
    costos: { obra_nueva: '$800 - $8,000 MXN segun m2', remodelacion: '$400 - $3,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato municipal de la Direccion de Obras Publicas. Colima tiene tramites agiles.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Uso de suelo compatible', descripcion: 'Emitido por la Direccion de Desarrollo Urbano del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO o responsiva', descripcion: 'Con cedula profesional vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Colima', descripcion: 'Registro Publico de la Propiedad del Estado.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  durango: {
    nombre: 'Durango',
    dependencia: 'Direccion de Obras Publicas Municipal',
    descripcion: 'Durango opera principalmente desde la capital con el mismo nombre. La Direccion de Desarrollo Urbano Municipal gestiona los tramites. Durango tiene actividad industrial moderada con desarrollo habitacional creciente en la capital.',
    url: 'https://durango.gob.mx/tramites',
    tiempos: { obra_nueva: '15-30 dias habiles', remodelacion: '10-20 dias habiles' },
    costos: { obra_nueva: '$1,200 - $12,000 MXN segun m2', remodelacion: '$500 - $4,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato de la Direccion de Desarrollo Urbano del municipio de Durango.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Licencia de uso de suelo', descripcion: 'Emitida por la Direccion de Desarrollo Urbano Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO', descripcion: 'Con cedula profesional vigente y registro municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial del ano en curso', descripcion: 'Emitido por la Tesoreria Municipal de Durango.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Durango', descripcion: 'Con folio real vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  edomex: {
    nombre: 'Estado de Mexico',
    dependencia: 'Ayuntamiento Municipal / Direccion de Desarrollo Urbano',
    descripcion: 'En el Estado de Mexico cada municipio tiene su propia reglamentacion. Los municipios del Valle de Mexico (Tlalnepantla, Ecatepec, Nezahualcoyotl, Toluca) son los mas estrictos. Se expide por el Ayuntamiento a traves de la Direccion de Desarrollo Urbano.',
    url: 'https://edomex.gob.mx/tramites_servicios',
    tiempos: { obra_nueva: '20-45 dias habiles', remodelacion: '15-30 dias habiles' },
    costos: { obra_nueva: '$2,000 - $25,000 MXN segun m2', remodelacion: '$800 - $8,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion (formato municipal)', descripcion: 'Cada municipio tiene su formato. Incluir datos del propietario y descripcion de la obra.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Licencia de uso de suelo compatible', descripcion: 'Emitida por la Direccion de Desarrollo Urbano del municipio. Verifica zonificacion.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO o responsiva profesional', descripcion: 'Para obra menor puede ser responsiva. Para obra mayor se exige DRO registrado.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Cedula catastral del predio actualizada', descripcion: 'Emitida por la Direccion de Catastro Municipal. Debe coincidir con la escritura.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante de pago del Impuesto Predial al corriente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal del EdoMex.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en el RPP del Estado de Mexico', descripcion: 'Copia certificada con inscripcion vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial vigente del propietario', descripcion: 'INE/Pasaporte. Representante legal con poder notariado si el dueno no puede presentarse.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  guanajuato: {
    nombre: 'Guanajuato',
    dependencia: 'Direccion de Desarrollo Urbano Municipal / SDAOT',
    descripcion: 'Guanajuato tiene un Reglamento de Construccion estatal que orienta a los municipios. Los municipios de Leon, Silao e Irapuato (zona del Bajio industrial) son los mas activos y estrictos, especialmente en tramites de naves industriales por el nearshoring.',
    url: 'https://guanajuato.gob.mx/tramites',
    tiempos: { obra_nueva: '15-35 dias habiles', remodelacion: '10-20 dias habiles' },
    costos: { obra_nueva: '$1,800 - $20,000 MXN segun m2', remodelacion: '$700 - $7,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion (formato municipal)', descripcion: 'Cada municipio de Guanajuato tiene su propio formato.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de alineamiento y numero oficial', descripcion: 'Emitida por el Catastro Municipal o la Direccion de Obras Publicas.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Certificado de uso de suelo', descripcion: 'Compatibilidad del uso propuesto con el Plan Municipal de Desarrollo Urbano.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO o responsiva', descripcion: 'Con cedula profesional. Obra menor puede presentar responsiva en lugar de DRO completo.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'No mayor a 3 meses. Emitido por la Tesoreria Municipal de Guanajuato.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura con inscripcion RPP Guanajuato', descripcion: 'Registro Publico de la Propiedad del Estado de Guanajuato.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  guerrero: {
    nombre: 'Guerrero',
    dependencia: 'Direccion de Obras Publicas Municipal / SEDESOL Guerrero',
    descripcion: 'En Guerrero destacan Acapulco, Zihuatanejo y Chilpancingo. Zona sismica de alta actividad. Los tramites de construccion en zonas turisticas de la costa tienen requisitos adicionales de impacto ambiental y visual. Norma sismica de alta rigurosidad.',
    url: 'https://guerrero.gob.mx/tramites',
    tiempos: { obra_nueva: '25-50 dias habiles', remodelacion: '15-30 dias habiles' },
    costos: { obra_nueva: '$1,500 - $15,000 MXN segun m2', remodelacion: '$600 - $5,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Presidencia municipal o H. Ayuntamiento del municipio donde se construye.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Estudio de mecanica de suelos (zona sismica alta)', descripcion: 'Guerrero esta en zona sismica I y II. El estudio es fundamental para cualquier obra de mas de 1 nivel.', obligatorio: false, tipo: 'obra_nueva' },
      { doc: 'Calculo estructural con normas sismicas', descripcion: 'Debe cumplir el Reglamento de Construcciones de Guerrero y NTC-Sismo 2023.', obligatorio: false, tipo: 'obra_nueva' },
      { doc: 'Planos arquitectonicos firmados por DRO', descripcion: 'Con cedula profesional vigente. En zonas turisticas puede requerirse DRO con registro FONATUR.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Guerrero', descripcion: 'Registro Publico de la Propiedad del Estado.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  hidalgo: {
    nombre: 'Hidalgo',
    dependencia: 'SEDESOPH / Direccion de Desarrollo Urbano Municipal',
    descripcion: 'Hidalgo tiene como centros principales Pachuca, Tula, Tizayuca y Tulancingo. La SEDESOPH (Secretaria de Obras Publicas e Hidraulicas) orienta los estandares. Tula tiene requisitos adicionales por su zona industrial y las plantas termoelectricas de la region.',
    url: 'https://hidalgo.gob.mx/tramites',
    tiempos: { obra_nueva: '20-40 dias habiles', remodelacion: '12-25 dias habiles' },
    costos: { obra_nueva: '$1,500 - $15,000 MXN segun m2', remodelacion: '$600 - $5,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion (formato municipal)', descripcion: 'Disponible en la presidencia municipal o Direccion de Obras Publicas del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de uso de suelo', descripcion: 'Emitida por la Direccion de Desarrollo Urbano o presidencia municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por profesionista', descripcion: 'Con cedula profesional. Para obra mayor de 2 niveles se requiere DRO.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal de Hidalgo.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura o titulo de propiedad', descripcion: 'Con inscripcion en el RPP del Estado de Hidalgo.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  jalisco: {
    nombre: 'Jalisco (Guadalajara / ZMG)',
    dependencia: 'Direccion de Obras Publicas Municipal / SEMADET',
    descripcion: 'En Jalisco los tramites son municipales. En Guadalajara operan las Ventanillas de Tramitacion Instantanea para obras menores. Para obras mayores se requiere DRO registrado ante el Colegio de Arquitectos Jalisco (CAJ) o el CMIC Jalisco.',
    url: 'https://transparencia.guadalajara.gob.mx/requisitos-licencia-construccion',
    tiempos: { obra_nueva: '15-30 dias habiles', remodelacion: '10-20 dias habiles' },
    costos: { obra_nueva: '$2,000 - $25,000 MXN segun m2', remodelacion: '$800 - $8,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion (formato oficial DOP)', descripcion: 'Disponible en la Direccion de Obras Publicas o portal del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de Alineamiento y Numero Oficial vigente', descripcion: 'Se tramita en la Jefatura de Dictamenes y Alineamientos de la DOP.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Licencia de uso de suelo vigente', descripcion: 'Emitida por SEMADET Jalisco o la Direccion de Desarrollo Urbano del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos escala 1:100 firmados por DRO (4 juegos)', descripcion: 'Plantas, fachadas, cortes y alzados. Indicar numero de cedula profesional del DRO.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante de pago del Impuesto Predial al corriente', descripcion: 'No mayor a 3 meses. El municipio verifica predial vigente antes de emitir licencia.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura o Titulo de Propiedad (copia certificada)', descripcion: 'Con inscripcion en el Registro Publico de la Propiedad de Jalisco.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial vigente del propietario', descripcion: 'INE o pasaporte. Si firma apoderado, carta poder notariada.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Calculo estructural firmado por Corresponsable', descripcion: 'Obligatorio para obras nuevas con sistema constructivo no tradicional o mayor a 3 niveles.', obligatorio: false, tipo: 'obra_nueva' },
      { doc: 'Memoria descriptiva y de calculo', descripcion: 'Describe el proyecto y justifica las decisiones tecnicas. Firmada por DRO.', obligatorio: false, tipo: 'obra_nueva' },
      { doc: 'Certificado de no adeudo de agua (SIAPA)', descripcion: 'Sistema Intermunicipal de los Servicios de Agua Potable. Requerido para nueva conexion.', obligatorio: false, tipo: 'obra_nueva' }
    ]
  },

  michoacan: {
    nombre: 'Michoacan',
    dependencia: 'SEICUM / Direccion de Obras Publicas Municipal',
    descripcion: 'Los principales centros de tramites son Morelia, Uruapan y Lazaro Cardenas. Morelia tiene zona de control historico (Patrimonio UNESCO). La SEICUM (Secretaria de Infraestructura y Obra Publica) regula los estandares del estado.',
    url: 'https://morelia.gob.mx/tramites/construccion',
    tiempos: { obra_nueva: '20-40 dias habiles', remodelacion: '12-25 dias habiles' },
    costos: { obra_nueva: '$1,500 - $15,000 MXN segun m2', remodelacion: '$600 - $5,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato del municipio correspondiente. Morelia cuenta con ventanilla unica municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Licencia de uso de suelo', descripcion: 'Emitida por la Direccion de Desarrollo Urbano del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO o responsiva', descripcion: 'Con cedula profesional vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura con inscripcion RPP Michoacan', descripcion: 'Registro Publico de la Propiedad del Estado.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Dictamen INAH (Morelia centro historico)', descripcion: 'Obligatorio para obras en la zona de monumentos de Morelia, declarada Patrimonio UNESCO.', obligatorio: false, tipo: 'ambos' }
    ]
  },

  morelos: {
    nombre: 'Morelos',
    dependencia: 'SAOP / Direccion de Obras Publicas Municipal',
    descripcion: 'Morelos tiene a Cuernavaca como centro principal. Por su cercania con CDMX y su atraccion como destino residencial, los tramites de construccion son frecuentes. La zona es sismica (sismo 2017 fue centrado en el estado) por lo que los calculos estructurales son fundamentales.',
    url: 'https://cuernavaca.gob.mx/tramites',
    tiempos: { obra_nueva: '20-40 dias habiles', remodelacion: '10-25 dias habiles' },
    costos: { obra_nueva: '$2,000 - $18,000 MXN segun m2', remodelacion: '$800 - $6,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato de la Direccion de Obras Publicas del municipio. Cuernavaca tiene ventanilla presencial.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Licencia de uso de suelo', descripcion: 'Emitida por la Secretaria de Asentamientos y Obras Publicas (SAOP) de Morelos.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos y calculo estructural', descripcion: 'Por la actividad sismica en Morelos, el calculo estructural es fundamental. Firmados por DRO.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial del ano en curso', descripcion: 'Emitido por la Tesoreria Municipal. Verificacion de no adeudos.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Morelos', descripcion: 'Registro Publico de la Propiedad del Estado de Morelos.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  nayarit: {
    nombre: 'Nayarit',
    dependencia: 'Direccion de Desarrollo Urbano Municipal / SEPEN',
    descripcion: 'Tepic es la capital y el centro de tramites principal. La Riviera Nayarit (Bahia de Banderas) tiene alta actividad constructiva turistica con requisitos adicionales de impacto ambiental y visual por ser zona de desarrollo turistico prioritario.',
    url: 'https://nayarit.gob.mx/tramites',
    tiempos: { obra_nueva: '20-40 dias habiles', remodelacion: '12-25 dias habiles' },
    costos: { obra_nueva: '$1,200 - $12,000 MXN segun m2', remodelacion: '$500 - $4,500 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato municipal. Para Bahia de Banderas: coordinar con FONATUR en zona turistica.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Uso de suelo compatible', descripcion: 'Emitido por la Direccion de Desarrollo Urbano. Especialmente relevante en zona costera turistica.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO', descripcion: 'Con cedula profesional vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura con inscripcion RPP Nayarit', descripcion: 'Registro Publico de la Propiedad del Estado.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Autorizacion SEMARNAT/MIA (zona costera turistica)', descripcion: 'Para proyectos en la Riviera Nayarit o zona federal maritimo-terrestre.', obligatorio: false, tipo: 'obra_nueva' }
    ]
  },

  nuevo_leon: {
    nombre: 'Nuevo Leon (Monterrey / AMM)',
    dependencia: 'SICODE / Secretaria de Desarrollo Sustentable NL',
    descripcion: 'En Nuevo Leon los tramites se realizan en SICODE (Sistema de Informacion y Control de la Obra para el Desarrollo de Edificaciones). Es el estado mas digitalizado en tramites de construccion. El calculo estructural es obligatorio para toda obra nueva.',
    url: 'https://sicode.nl.gob.mx',
    tiempos: { obra_nueva: '20-40 dias habiles', remodelacion: '10-20 dias habiles' },
    costos: { obra_nueva: '$3,000 - $35,000 MXN segun m2', remodelacion: '$1,500 - $12,000 MXN' },
    documentos: [
      { doc: 'Registro en SICODE Nuevo Leon (tramite digital)', descripcion: 'Plataforma en linea del gobierno de NL. El expediente se sube digitalmente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Croquis de localizacion georeferenciado (con coordenadas GPS)', descripcion: 'Obligatorio desde 2024. El sistema verifica la ubicacion del predio automaticamente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos y estructurales firmados por DRO', descripcion: 'El DRO debe tener cedula profesional y registro vigente ante el municipio de NL.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Calculo estructural completo firmado por perito', descripcion: 'Obligatorio para TODA obra nueva en Nuevo Leon, independientemente del tamano.', obligatorio: true, tipo: 'obra_nueva' },
      { doc: 'Memoria descriptiva del proyecto', descripcion: 'Incluyendo sistema constructivo, materiales y especificaciones tecnicas.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante de pago del Predial emitido por Tesoreria Municipal', descripcion: 'Actualizado al ano en curso. Verificado en el sistema SICODE.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en el RPP de Nuevo Leon', descripcion: 'Registro Publico de la Propiedad. Folio real vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'DRO con registro vigente ante el municipio de NL', descripcion: 'El arquitecto o ingeniero civil debe tener cedula y registro municipal activo.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Factibilidad de agua emitida por Agua y Drenaje de Monterrey', descripcion: 'SADM. Verifica que el predio tiene acceso a red de agua potable y drenaje.', obligatorio: false, tipo: 'obra_nueva' }
    ]
  },

  oaxaca: {
    nombre: 'Oaxaca',
    dependencia: 'SEDATU / H. Ayuntamiento de Oaxaca / INAH (centro historico)',
    descripcion: 'Oaxaca tiene normativa especial para el centro historico de la ciudad de Oaxaca (Patrimonio de la Humanidad UNESCO). INAH supervisa todos los trabajos en zonas de monumentos historicos. Las comunidades indigenas tienen usos y costumbres que pueden requerir autorizacion comunal.',
    url: 'https://oaxaca.gob.mx/tramites',
    tiempos: { obra_nueva: '25-50 dias habiles', remodelacion: '15-35 dias habiles' },
    costos: { obra_nueva: '$1,200 - $12,000 MXN segun m2', remodelacion: '$500 - $4,500 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion (H. Ayuntamiento)', descripcion: 'Para ciudad de Oaxaca: Direccion de Obras Publicas del municipio. Otros municipios: presidencia.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Uso de suelo compatible', descripcion: 'Emitido por la Direccion de Desarrollo Urbano. Especialmente relevante en zonas de control urbano.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por profesionista', descripcion: 'Con cedula profesional. En centro historico deben seguir lineamientos de imagen urbana INAH/SEDUVI.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Dictamen del INAH (zona de monumentos)', descripcion: 'OBLIGATORIO para cualquier obra en el centro historico de Oaxaca o zonas de monumentos federales.', obligatorio: false, tipo: 'ambos' },
      { doc: 'Autorizacion de la Asamblea Comunal (bienes comunales)', descripcion: 'Requerida para predios en regimen de bienes comunales o ejidales de comunidades indigenas.', obligatorio: false, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura o documentacion de propiedad', descripcion: 'Inscrita en el RPP de Oaxaca o documentacion equivalente para bienes comunales.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  puebla: {
    nombre: 'Puebla',
    dependencia: 'SEDUM / Direccion de Obras Publicas Municipal',
    descripcion: 'Los tramites de licencia en Puebla se gestionan ante la Secretaria de Desarrollo Urbano Municipal (SEDUM) del municipio correspondiente. El municipio de Puebla requiere pago del predial de los ultimos 5 anos, lo cual es un requisito unico en el pais.',
    url: 'https://pueblacapital.gob.mx/tramites',
    tiempos: { obra_nueva: '20-35 dias habiles', remodelacion: '15-25 dias habiles' },
    costos: { obra_nueva: '$2,500 - $20,000 MXN segun m2', remodelacion: '$1,000 - $8,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion (formato SEDUM)', descripcion: 'Disponible en ventanilla o portal del municipio. Incluye descripcion de la obra.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Licencia de uso de suelo vigente', descripcion: 'Emitida por SEDUM o Direccion de Desarrollo Urbano. Verifica compatibilidad del uso.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por Director Responsable de Obra', descripcion: 'Arquitecto o ingeniero civil con cedula profesional y registro SECOCOT Puebla.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Memoria descriptiva del proyecto', descripcion: 'Incluyendo especificaciones de materiales, sistemas constructivos y programa de obra.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Pago del Impuesto Predial de los ultimos 5 anos al corriente', descripcion: 'REQUISITO UNICO de Puebla. El municipio verifica que no existan adeudos prediales anteriores.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura o Titulo de Propiedad', descripcion: 'Inscrita en el Registro Publico de Puebla. Copia simple y cotejo.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial vigente del propietario', descripcion: 'INE/Pasaporte. Si firma tercero, carta poder notariada o poder legal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos estructurales y calculo estructural', descripcion: 'Requerido para obras nuevas de 2 niveles o mas o con sistema constructivo no tradicional.', obligatorio: false, tipo: 'obra_nueva' }
    ]
  },

  queretaro: {
    nombre: 'Queretaro',
    dependencia: 'SEDESU / Direccion de Desarrollo Urbano Municipal',
    descripcion: 'Queretaro es uno de los estados con mayor crecimiento inmobiliario e industrial en Mexico. Los tramites estan parcialmente digitalizados mediante la plataforma SIDEQ. Es obligatorio el Dictamen de Impacto Urbano para proyectos sobre 500 m2.',
    url: 'https://municipiodequeretaro.gob.mx/tramites',
    tiempos: { obra_nueva: '20-40 dias habiles', remodelacion: '10-20 dias habiles' },
    costos: { obra_nueva: '$2,500 - $30,000 MXN segun m2', remodelacion: '$1,000 - $10,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion o manifestacion de obra', descripcion: 'Disponible en la Direccion de Desarrollo Urbano Municipal o plataforma SIDEQ.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de zonificacion y uso de suelo', descripcion: 'Emitida por SEDESU o el municipio. Vigencia de 6 meses.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos y estructurales firmados por DRO', descripcion: 'DRO debe estar registrado ante el Colegio de Arquitectos de Queretaro o CMIC.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Memoria descriptiva y de calculo estructural', descripcion: 'Para toda obra nueva. Justifica el sistema constructivo y resistencia estructural.', obligatorio: true, tipo: 'obra_nueva' },
      { doc: 'Comprobante predial al corriente', descripcion: 'Ano en curso. La plataforma SIDEQ puede verificarlo automaticamente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Queretaro', descripcion: 'Con folio real vigente en el Registro Publico de la Propiedad de Queretaro.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Dictamen de Impacto Urbano', descripcion: 'Obligatorio para proyectos mayores a 500 m2. Evalua impacto en vialidad, infraestructura y servicios.', obligatorio: false, tipo: 'obra_nueva' }
    ]
  },

  quintana_roo: {
    nombre: 'Quintana Roo',
    dependencia: 'SEDATU / Direccion de Desarrollo Urbano Municipal / SEMARNAT',
    descripcion: 'Cancun, Playa del Carmen, Tulum y Cozumel son los centros de mayor actividad constructiva. Alta presencia de inversion extranjera. Zona de alto riesgo ambiental: manglares, cenotes y arrecifes requieren autorizacion de impacto ambiental. SEMARNAT supervisa proyectos en zona costera.',
    url: 'https://quintanaroo.gob.mx/tramites',
    tiempos: { obra_nueva: '30-60 dias habiles', remodelacion: '20-35 dias habiles' },
    costos: { obra_nueva: '$4,000 - $60,000 MXN segun m2', remodelacion: '$2,000 - $20,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato del municipio de Benito Juarez (Cancun), Solidaridad (Playa) o el municipio correspondiente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Certificado de uso de suelo', descripcion: 'Emitido por el municipio. Verifica zonificacion y compatibilidad con el PDU local.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Resolutivo de impacto ambiental (SEMARNAT)', descripcion: 'OBLIGATORIO para proyectos que afecten ecosistemas costeros, manglares o cenotes. Proceso largo: 3-6 meses.', obligatorio: false, tipo: 'obra_nueva' },
      { doc: 'Factibilidad de agua y drenaje (CAPA)', descripcion: 'Comision de Agua Potable y Alcantarillado de Quintana Roo. Critico por limitantes hidricas.', obligatorio: true, tipo: 'obra_nueva' },
      { doc: 'Planos arquitectonicos y estructurales con DRO', descripcion: 'DRO con cedula y registro municipal. Conocimiento de normas locales de construccion costera.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial al corriente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal correspondiente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Quintana Roo', descripcion: 'Registro Publico del Estado. Verificar que el predio no sea zona federal.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  san_luis_potosi: {
    nombre: 'San Luis Potosi',
    dependencia: 'Direccion de Obras Publicas Municipal / SEDESOL SLP',
    descripcion: 'San Luis Potosi capital es el centro de tramites principal. El crecimiento industrial del Bajio ha impulsado mas construcciones. La SEDESOL (Secretaria de Desarrollo Social) orienta los estandares habitacionales.',
    url: 'https://sanluispotosi.gob.mx/tramites',
    tiempos: { obra_nueva: '20-35 dias habiles', remodelacion: '10-25 dias habiles' },
    costos: { obra_nueva: '$1,500 - $15,000 MXN segun m2', remodelacion: '$600 - $5,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato de la Direccion de Obras Publicas del municipio correspondiente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de uso de suelo', descripcion: 'Emitida por la Direccion de Desarrollo Urbano o el municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO o responsiva', descripcion: 'Con cedula profesional y registro municipal vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Tesoreria Municipal de San Luis Potosi.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP San Luis Potosi', descripcion: 'Con inscripcion vigente en el Registro Publico del Estado.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  sinaloa: {
    nombre: 'Sinaloa',
    dependencia: 'Direccion de Desarrollo Urbano Municipal',
    descripcion: 'Los centros principales son Culiacan y Mazatlan. Mazatlan tiene zona turistica con requisitos especificos para construccion en zona costera. La SINTRA (Sistema de Tramitacion) de Culiacan agiliza algunos tramites en linea.',
    url: 'https://culiacan.gob.mx/tramites',
    tiempos: { obra_nueva: '15-30 dias habiles', remodelacion: '10-20 dias habiles' },
    costos: { obra_nueva: '$1,500 - $15,000 MXN segun m2', remodelacion: '$600 - $5,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato municipal. Culiacan: Sistema SINTRA en linea para algunos tramites.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Certificado de uso de suelo', descripcion: 'Emitido por la Direccion de Desarrollo Urbano del municipio correspondiente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO o responsiva', descripcion: 'Con cedula profesional vigente. DRO para obras mayores.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal de Sinaloa.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Sinaloa', descripcion: 'Registro Publico de la Propiedad del Estado.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  sonora: {
    nombre: 'Sonora',
    dependencia: 'ISSSTESON / Direccion de Desarrollo Urbano Municipal',
    descripcion: 'En Sonora destacan Hermosillo (capital), Nogales (frontera norte) y Guaymas. Hermosillo tiene un sistema digital para tramites de construccion. Nogales tiene requisitos adicionales por ser zona fronteriza y tener trafago con EE.UU.',
    url: 'https://hermosillo.gob.mx/tramites/construccion',
    tiempos: { obra_nueva: '15-35 dias habiles', remodelacion: '10-20 dias habiles' },
    costos: { obra_nueva: '$1,500 - $20,000 MXN segun m2', remodelacion: '$600 - $6,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato de la Direccion de Desarrollo Urbano del municipio correspondiente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Licencia de uso de suelo vigente', descripcion: 'Emitida por el municipio. Verifica compatibilidad con PDU (Plan de Desarrollo Urbano).', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO', descripcion: 'Arquitecto o Ingeniero Civil con cedula y registro ante el municipio de Sonora.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial al corriente', descripcion: 'Del ano en curso. Emitido por Catastro Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Sonora', descripcion: 'Registro Publico de la Propiedad. Folio real vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  tabasco: {
    nombre: 'Tabasco',
    dependencia: 'Direccion de Obras Publicas Municipal / SEDETUR',
    descripcion: 'Tabasco opera principalmente desde Villahermosa. Por ser zona de alta pluviosidad y suelo arcilloso, los calculos estructurales deben considerar la capacidad de carga del suelo. Las normas sismicas aplican con mayor rigurosidad en zonas de influencia del Istmo.',
    url: 'https://villahermosa.gob.mx/tramites',
    tiempos: { obra_nueva: '20-40 dias habiles', remodelacion: '15-25 dias habiles' },
    costos: { obra_nueva: '$1,500 - $15,000 MXN segun m2', remodelacion: '$600 - $5,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato del H. Ayuntamiento de Villahermosa o presidencia municipal del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Estudio de mecanica de suelos', descripcion: 'RECOMENDADO en toda Tabasco por la alta plasticidad del suelo arcilloso. Obligatorio para mas de 2 niveles.', obligatorio: false, tipo: 'obra_nueva' },
      { doc: 'Planos arquitectonicos y estructurales firmados', descripcion: 'Por arquitecto o ingeniero civil con cedula profesional vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura o titulo de propiedad', descripcion: 'Con inscripcion en el RPP del Estado de Tabasco.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  tamaulipas: {
    nombre: 'Tamaulipas',
    dependencia: 'Direccion de Desarrollo Urbano y Ecologia Municipal',
    descripcion: 'Los centros principales son Matamoros, Reynosa, Tampico y Ciudad Victoria. Por la actividad industrial fronteriza, los permisos para naves industriales son frecuentes. Los municipios fronterizos tienen mayor agilidad en tramites por la inversion maquiladora.',
    url: 'https://tamaulipas.gob.mx/tramites',
    tiempos: { obra_nueva: '15-35 dias habiles', remodelacion: '10-20 dias habiles' },
    costos: { obra_nueva: '$1,800 - $20,000 MXN segun m2', remodelacion: '$700 - $6,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato municipal de la Direccion de Obras Publicas o Desarrollo Urbano.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de uso de suelo o factibilidad de uso', descripcion: 'Emitida por la Direccion de Desarrollo Urbano del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos y estructurales con DRO', descripcion: 'Con cedula profesional. DRO registrado ante el Colegio de Arquitectos de Tamaulipas.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial al corriente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Tamaulipas', descripcion: 'Con folio real vigente en el Registro Publico del Estado.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  tlaxcala: {
    nombre: 'Tlaxcala',
    dependencia: 'SECOCOT / Presidencia Municipal',
    descripcion: 'Tlaxcala es el estado mas pequeno de Mexico y sus tramites son principalmente municipales ante la presidencia o el ayuntamiento. La SECOCOT (Secretaria de Comunicaciones, Construccion y Obra Publica del Tlaxcala) registra a los DRO del estado.',
    url: 'https://tlaxcala.gob.mx/secocot',
    tiempos: { obra_nueva: '10-25 dias habiles', remodelacion: '7-15 dias habiles' },
    costos: { obra_nueva: '$800 - $10,000 MXN segun m2', remodelacion: '$400 - $4,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion (formato presidencia municipal)', descripcion: 'Presentar en la presidencia del municipio donde se ubica el predio. Puede variar por municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de alineamiento y numero oficial', descripcion: 'Emitida por la presidencia municipal o el H. Ayuntamiento. Define los limites de construccion.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por profesionista con registro SECOCOT', descripcion: 'El arquitecto o ingeniero civil debe tener cedula profesional y registro vigente en SECOCOT Tlaxcala.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Responsiva profesional o DRO', descripcion: 'Arquitecto o ingeniero civil que se responsabiliza tecnicamente de la obra.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante del Impuesto Predial vigente', descripcion: 'No mayor a 1 ano. Emitido por la Tesoreria Municipal de Tlaxcala.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura o Titulo de Propiedad', descripcion: 'Copia simple y cotejo. No siempre se exige inscripcion RPP en municipios pequenos.', obligatorio: true, tipo: 'ambos' }
    ]
  },

  veracruz: {
    nombre: 'Veracruz',
    dependencia: 'Direccion de Desarrollo Urbano Municipal / SEDECOP',
    descripcion: 'En Veracruz los tramites son municipales. El puerto de Veracruz, Xalapa y Cordoba tienen las ventanillas mas activas. Se requiere compatibilidad con el Programa Municipal de Desarrollo Urbano vigente. Zona costera tiene requisitos adicionales de impacto ambiental.',
    url: 'https://veracruz.gob.mx/tramites',
    tiempos: { obra_nueva: '20-40 dias habiles', remodelacion: '15-25 dias habiles' },
    costos: { obra_nueva: '$1,500 - $18,000 MXN segun m2', remodelacion: '$700 - $6,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion (formato municipal)', descripcion: 'Disponible en la Direccion de Obras Publicas o presidencia municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Certificado de uso de suelo compatible', descripcion: 'Verifica que el uso propuesto este permitido en la zona. Emitido por Desarrollo Urbano.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por profesionista con cedula', descripcion: 'Arquitecto o Ingeniero Civil con cedula profesional vigente SEP/UNAM.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante de pago del Impuesto Predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura del predio con inscripcion RPP Veracruz', descripcion: 'Registro Publico de la Propiedad del Estado de Veracruz.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Constancia de no afectacion de zona federal (zona costera)', descripcion: 'Requerida para predios en municipios costeros. Emitida por SEMARNAT/ZOFEMAT.', obligatorio: false, tipo: 'obra_nueva' }
    ]
  },

  yucatan: {
    nombre: 'Yucatan',
    dependencia: 'SEDUMA / Direccion de Desarrollo Urbano de Merida',
    descripcion: 'Yucatan tiene reglas especiales para el centro historico de Merida (zona de control patrimonial INAH). Para inmuebles en el centro se requiere dictamen del INAH o la SEDUMA. Para el resto del estado los tramites son municipales con requisitos estandar.',
    url: 'https://merida.gob.mx/tramites/obra-y-construccion',
    tiempos: { obra_nueva: '20-35 dias habiles', remodelacion: '10-20 dias habiles' },
    costos: { obra_nueva: '$2,000 - $22,000 MXN segun m2', remodelacion: '$800 - $7,000 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion (formato SEDUMA o municipal)', descripcion: 'Para Merida: Portal SAME (Sistema de Atencion Merida en Linea). Otros municipios: ventanilla presencial.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Certificado de uso de suelo', descripcion: 'Emitido por la Direccion de Desarrollo Urbano. Indica si el uso es compatible con la zonificacion.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO o profesionista', descripcion: 'Con cedula profesional vigente. El DRO debe estar registrado ante el municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial del ano en curso', descripcion: 'Emitido por la Tesoreria Municipal de Yucatan.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura con inscripcion RPP Yucatan', descripcion: 'Registro Publico de la Propiedad del Estado de Yucatan.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Dictamen del INAH (zona de monumentos historicos)', descripcion: 'OBLIGATORIO para inmuebles en el centro historico de Merida y otras zonas de control patrimonial.', obligatorio: false, tipo: 'ambos' },
      { doc: 'Visto bueno de SEDUMA (zona de control)', descripcion: 'Para inmuebles en zonas bajo control urbanistico especial de la SEDUMA.', obligatorio: false, tipo: 'ambos' }
    ]
  },

  zacatecas: {
    nombre: 'Zacatecas',
    dependencia: 'Direccion de Obras Publicas Municipal / INAH (zona historica)',
    descripcion: 'Zacatecas capital es Patrimonio de la Humanidad UNESCO. El centro historico requiere visto bueno del INAH para cualquier intervencion. El estado tiene actividad minera importante. La normativa local aplica restricciones de altura e imagen urbana en la capital.',
    url: 'https://zacatecas.gob.mx/tramites',
    tiempos: { obra_nueva: '20-40 dias habiles', remodelacion: '15-30 dias habiles' },
    costos: { obra_nueva: '$1,200 - $12,000 MXN segun m2', remodelacion: '$500 - $4,500 MXN' },
    documentos: [
      { doc: 'Solicitud de licencia de construccion', descripcion: 'Formato municipal. En Zacatecas capital: Direccion de Obras Publicas o Desarrollo Urbano.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Dictamen del INAH (centro historico)', descripcion: 'OBLIGATORIO en la zona historica de Zacatecas. Cualquier obra exterior requiere aprobacion del INAH.', obligatorio: false, tipo: 'ambos' },
      { doc: 'Uso de suelo compatible', descripcion: 'Emitido por la Direccion de Desarrollo Urbano del municipio.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Planos arquitectonicos firmados por DRO', descripcion: 'Con cedula profesional. En centro historico debe seguir lineamientos INAH.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Comprobante predial vigente', descripcion: 'Del ano en curso. Emitido por la Tesoreria Municipal.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Escritura inscrita en RPP Zacatecas', descripcion: 'Con inscripcion vigente.', obligatorio: true, tipo: 'ambos' },
      { doc: 'Identificacion oficial del propietario', descripcion: 'INE/Pasaporte vigente.', obligatorio: true, tipo: 'ambos' }
    ]
  }

};

/* FUENTES: Reglamentos de Construccion estatales y municipales 2025-2026.
   Tramites CDMX, SEDUVI, SICODE NL, DOP Jalisco, SEDUM Puebla,
   SECOCOT Tlaxcala, SEMADET Jalisco, SEDESU Queretaro, SEDUMA Yucatan.
   Requisitos referenciales.
   Verificar siempre con la dependencia local antes de tramitar.
   Actualizacion: Abril 2026. */
