import ToolPageBase from "../_components/ToolPageBase";

export default function PreciosPage() {
  return (
    <ToolPageBase
      badge="Datos Regionales"
      badgeColor="var(--color-soft-rose)"
      title={"Precios por\nEstado"}
      subtitle="Factores FIC SICT 2025 para los 33 estados de México. Compara costos de mano de obra y materiales por región."
      accentColor="#dd90d8"
      icon="📍"
      description="Estamos consolidando los factores regionales SICT 2025 para los 33 estados con datos diferenciados por zona."
    />
  );
}
