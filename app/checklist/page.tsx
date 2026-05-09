import ToolPageBase from "../_components/ToolPageBase";

export default function ChecklistPage() {
  return (
    <ToolPageBase
      badge="Trámites y Permisos"
      badgeColor="var(--color-lavender-mist)"
      title={"Checklist de\nPermisos"}
      subtitle="Guía de trámites para licencias de construcción, manifestaciones de obra y dictámenes por municipio y estado."
      accentColor="#d1c9ff"
      icon="📋"
      description="Estamos mapeando los requisitos de permisos de construcción para los 32 estados de México."
    />
  );
}
