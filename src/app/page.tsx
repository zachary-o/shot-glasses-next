import ShotGlassesList from "@/components/shared/ShotGlassesList";
import { getAllShotGlasses } from "@/queries/getAllShotGlasses";

export default async function Home({ modal }: { modal: React.ReactNode }) {
  const items = await getAllShotGlasses();

  return (
    <main className="font-normal space-y-4">
      <ShotGlassesList initialItems={items} />
      {modal}
    </main>
  );
}
