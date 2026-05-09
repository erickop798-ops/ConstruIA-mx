import ToolPageBase from "../_components/ToolPageBase";

export default function SimuladorPage() {
  return (
    <ToolPageBase
      badge="IA Incluida"
      badgeColor="var(--color-ocean-glimmer)"
      title={"Simulador de\nRemodelación"}
      subtitle="Describe tu proyecto en lenguaje natural. El agente hace máximo 3 preguntas y genera el estimado con precios reales."
      accentColor="#00b3dd"
      icon="🏠"
      description="Estamos entrenando el flujo conversacional de remodelación con datos de mercado zona centro México 2026."
    />
  );
}
