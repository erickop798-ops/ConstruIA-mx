'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: '¿Los precios CMIC 2026 son realmente los oficiales y están actualizados?',
    a: 'Sí. ConstruIA utiliza el catálogo CEICO-CMIC 2026 publicado oficialmente por la Cámara Mexicana de la Industria de la Construcción, actualizado cada trimestre. Adicionalmente aplicamos el Índice de Costos FIC SICT 2025 para ajustar los precios por estado — lo que significa que un m² de losa en Tlaxcala tiene un costo diferente al de CDMX o Nuevo León. Sin promedios nacionales, con costos reales de tu región.',
  },
  {
    q: '¿Cómo funciona la generación del presupuesto? ¿Qué datos necesito?',
    a: 'El wizard de presupuesto toma 5 datos básicos: tipo de obra (vivienda, comercial, industrial), superficie en m², número de niveles, estado de la república y nivel de acabados. Con eso genera automáticamente las 24 partidas principales del CMIC, las cantidades de obra estimadas, el costo unitario por concepto y el total en tres escenarios — todo en menos de 2 minutos. Puedes ajustar cualquier partida manualmente antes de exportar.',
  },
  {
    q: '¿El PDF tiene el formato LOPSRM requerido por dependencias gubernamentales?',
    a: 'El plan Pro genera un PDF con la estructura exacta que establece la Ley de Obras Públicas y Servicios Relacionados con las Mismas (LOPSRM): número de partida, clave, descripción completa, unidad de medida, cantidad, precio unitario, importe parcial y total con y sin IVA. Es el formato aceptado por IMSS, CFE, gobiernos estatales y municipales. Incluye el resumen de indirectos, financiamiento y utilidad.',
  },
  {
    q: '¿El checklist de permisos funciona para cualquier tipo de obra y estado?',
    a: 'ConstruIA cubre licencias para obra nueva, ampliación, remodelación y cambio de uso de suelo en los 32 estados de México. Cada checklist incluye: documentos requeridos por la dependencia, instancia donde presentarlos (municipio, SEDESOL, SEMARNAT), vigencia del trámite y costo aproximado de derechos. Los requisitos se verifican trimestralmente contra las actualizaciones de cada reglamento de construcción estatal.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento? ¿Hay penalizaciones?',
    a: 'No hay contratos, periodos mínimos ni penalizaciones. Cancelas desde tu panel de cuenta en cualquier momento con un clic. Si cancelas, conservas acceso completo hasta el final del periodo ya pagado. La factura electrónica (CFDI) se emite automáticamente al inicio de cada periodo y puedes descargarla en cualquier momento.',
  },
  {
    q: '¿La calculadora de materiales incluye todos los insumos de la obra?',
    a: 'La Calculadora genera la lista de compra para 8 tipos de obra con 86 insumos diferenciados. Incluye materiales de estructura (concreto, varilla, block, tabique), instalaciones (cable, tubería, conexiones), acabados (azulejo, pintura, plafón) y la herramienta menor estimada. Cada cantidad ya incluye el factor de desperdicio por tipo de material — 5% para varilla, 10% para tabique, 15% para azulejo — basado en estándares CMIC.',
  },
  {
    q: '¿Necesito saber de software o tener conocimientos técnicos avanzados?',
    a: 'ConstruIA está diseñado para que un arquitecto recién egresado genere el mismo presupuesto profesional que uno con 20 años de experiencia. Si puedes usar WhatsApp puedes usar ConstruIA. El wizard pregunta en lenguaje natural, el Copiloto responde en términos que conoces y los PDFs se generan solos. No hay curva de aprendizaje, no hay capacitación previa, no hay configuraciones complejas.',
  },
  {
    q: '¿En qué se diferencia ConstruIA de contratar un presupuestador o usar BIM?',
    a: 'Un presupuestador profesional cobra entre $3,000 y $15,000 MXN por proyecto y entrega en 3 a 7 días. Un software BIM como Revit requiere inversión en licencia ($25,000+ MXN/año), capacitación de meses y un modelo 3D completo. ConstruIA genera el mismo resultado que el presupuestador en 2 minutos, por $299 MXN/mes para proyectos ilimitados — sin curva de aprendizaje y con precios CMIC oficiales siempre actualizados.',
  },
];

const leftFAQs = FAQS.slice(0, 4);
const rightFAQs = FAQS.slice(4, 8);

function FAQItem({ faq, index, open, onToggle }: {
  faq: { q: string; a: string };
  index: number;
  open: number | null;
  onToggle: (i: number) => void;
}) {
  const isOpen = open === index;

  return (
    <div
      onClick={() => onToggle(index)}
      style={{
        background: '#141418',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '10px',
        padding: '20px 24px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '16px',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          fontWeight: 500,
          color: '#ECECEC',
          lineHeight: 1.4,
        }}>
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            flexShrink: 0,
            color: 'rgba(255,255,255,0.40)',
            display: 'flex',
            marginTop: '2px',
          }}
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.span>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.7,
              paddingTop: '14px',
              margin: 0,
            }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section style={{ background: '#111111', padding: '100px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '12px',
          }}>
            PREGUNTAS FRECUENTES
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            fontWeight: 500,
            color: '#ECECEC',
            lineHeight: 1.1,
          }}>
            Todo lo que necesitas saber<br />antes de empezar.
          </h2>
        </div>

        {/* 2-column grid — replicates monograph.com faq10_component */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          alignItems: 'start',
        }}>
          {/* Left column: Q1–Q4 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {leftFAQs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                open={open}
                onToggle={toggle}
              />
            ))}
          </div>

          {/* Right column: Q5–Q8 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {rightFAQs.map((faq, i) => (
              <FAQItem
                key={i + 4}
                faq={faq}
                index={i + 4}
                open={open}
                onToggle={toggle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
