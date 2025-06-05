import { getAllShotGlasses } from "@/queries/getAllShotGlasses";

export default async function Home() {
  const items = await getAllShotGlasses();
  console.log("items", items);
  return <main className="font-normal space-y-4"></main>;
}
