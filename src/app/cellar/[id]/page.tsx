import { INGREDIENTS } from "@/data/ingredients";
import { IngredientDetail } from "./IngredientDetail";

export function generateStaticParams() {
  return INGREDIENTS.map((i) => ({ id: i.id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <IngredientDetail id={id} />;
}
