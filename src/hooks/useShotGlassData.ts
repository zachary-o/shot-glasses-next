import { useQuery } from "@tanstack/react-query";

export function useShotGlassData(id: string) {
  return useQuery({
    queryKey: ["shotGlass", id],
    queryFn: async () => {
      const res = await fetch(`/api/shotGlass/${Number(id)}`);
      if (!res.ok) throw new Error("Failed to fetch shot glass");
      return res.json();
    },
    enabled: !!id,
  });
}
