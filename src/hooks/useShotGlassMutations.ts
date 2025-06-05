// import { ShotGlass } from "@prisma/client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export function useTeamMutations() {
//   const queryClient = useQueryClient();

//   const createTeamMutation = useMutation({
//     mutationFn: async (newShotGlass: { name: string; members: string[] }) => {
//       const response = await fetch("/api/shotGlasses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newShotGlass),
//       });
//       if (!response.ok) throw new Error("Failed to create team");
//       return response.json();
//     },
//     onMutate: async (newTeam) => {
//       await queryClient.cancelQueries({ queryKey: ["shotGlasses"] });
//       const currentTeams = queryClient.getQueryData(["shotGlasses"]);
//       queryClient.setQueryData(["shotGlasses"], (old: ShotGlass) => [
//         ...old,
//         { ...newTeam, id: `temp-${Date.now()}` },
//       ]);
//       return { currentTeams };
//     },
//     onError: (err, variables, context) => {
//       queryClient.setQueryData(["shotGlasses"], context.currentTeams);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["shotGlasses"] });
//     },
//   });

//   const deleteTeamMutation = useMutation({
//     mutationFn: async (teamId: string) => {
//       const response = await fetch(`/api/shotGlasses/${teamId}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error("Failed to delete team");
//       return response.json();
//     },
//     onMutate: async (teamId) => {
//       await queryClient.cancelQueries({ queryKey: ["shotGlasses"] });
//       const currentTeams = queryClient.getQueryData(["shotGlasses"]);
//       queryClient.setQueryData(["shotGlasses"], (old) =>
//         old.filter((team) => team.id !== teamId)
//       );
//       return { currentTeams };
//     },
//     onError: (err, teamId, context) => {
//       queryClient.setQueryData(["shotGlasses"], context.currentTeams);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["shotGlasses"] });
//     },
//   });

//   return {
//     createTeam: createTeamMutation.mutate,
//     deleteTeam: deleteTeamMutation.mutate,
//     isCreating: createTeamMutation.isLoading,
//     isDeleting: deleteTeamMutation.isLoading,
//   };
// }
