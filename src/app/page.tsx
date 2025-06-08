import ShotGlassesList from "@/components/shared/ShotGlassesList";
import { getAllShotGlasses } from "@/queries/getAllShotGlasses";
import { ShotGlassesProvider } from "../context/ShotGlassesContext";
export default async function Home() {
  const items = await getAllShotGlasses();
  console.log("items", items);
  return (
    <main className="font-normal space-y-4">
      <ShotGlassesProvider initialItems={items}>
        <ShotGlassesList />
      </ShotGlassesProvider>
    </main>
  );
}
