import ToolPageBase from "../_components/ToolPageBase";

export default function MaterialesPage() {
  return (
    <ToolPageBase
      badge="Catálogo de Insumos"
      badgeColor="var(--color-ocean-glimmer)"
      title={"Calculadora de\nMateriales"}
      subtitle="Precios unitarios actualizados de cemento, varilla, block, instalaciones y mano de obra. Zona Bajío/Centro Mar 2026."
      accentColor="#00b3dd"
      icon="🧱"
      description="Estamos cargando el catálogo completo de insumos CEICO-CMIC 2026 con precios verificados por zona geográfica."
    />
  );
}
