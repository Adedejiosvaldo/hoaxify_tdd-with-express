import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

try {
  prisma = new PrismaClient();
  console.log("Prisma Client initialized successfully.");
} catch (error) {
  console.error("Error initializing Prisma Client:", error);
  process.exit(1); // Exit the process with a failure code
}

1; // use `prisma` in your application to read and write data in your DB

export default prisma;
