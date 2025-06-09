import { CreateShotGlassInput } from "@/types";
import { ShotGlass } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useShotGlassMutations() {
  const queryClient = useQueryClient();

  const createShotGlassMutation = useMutation({
    mutationFn: async (newShotGlass: CreateShotGlassInput) => {
      const response = await fetch("/api/shotGlasses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newShotGlass),
      });
      if (!response.ok) {
        toast.error("Failed to create shot glass");
        throw new Error("Failed to create shot glass");
      }
      return response.json();
    },
    onMutate: async (newShotGlass) => {
      await queryClient.cancelQueries({ queryKey: ["shotGlasses"] });
      const currentShotGlasses = queryClient.getQueryData(["shotGlasses"]);
      queryClient.setQueryData(
        ["shotGlasses"],
        (old: CreateShotGlassInput[]) => [...old, newShotGlass]
      );
      return { currentShotGlasses };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["shotGlasses"], context?.currentShotGlasses);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shotGlasses"] });
    },
  });

  const deleteShotGlassMutation = useMutation({
    mutationFn: async (shotGlassId: string) => {
      const response = await fetch(`/api/shotGlasses/${shotGlassId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete shot glass");
      return response.json();
    },
    onMutate: async (shotGlassId) => {
      await queryClient.cancelQueries({ queryKey: ["shotGlasses"] });
      const currentShotGlasses = queryClient.getQueryData(["shotGlasses"]);
      queryClient.setQueryData(["shotGlasses"], (old: ShotGlass[]) =>
        old.filter((shotGlass) => shotGlass.id !== Number(shotGlassId))
      );
      return { currentShotGlasses };
    },
    onError: (err, shotGlassId, context) => {
      queryClient.setQueryData(["shotGlasses"], context?.currentShotGlasses);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["shotGlasses"] });
    },
  });

  return {
    createShotGlass: createShotGlassMutation.mutate,
    deleteShotGlass: deleteShotGlassMutation.mutate,
    isCreating: createShotGlassMutation.isPending,
    isDeleting: deleteShotGlassMutation.isPending,
  };
}
