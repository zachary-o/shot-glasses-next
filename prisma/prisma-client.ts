// import { prisma } from "@/prisma";

// async function clearDatabase() {
//   try {
//     // Delete records in the correct order to avoid foreign key constraints
//     await prisma.shotGlass.deleteMany();

//     console.log("✅ All data deleted from ShotGlass table.");
//   } catch (error) {
//     console.error("❌ Error deleting data:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// clearDatabase();