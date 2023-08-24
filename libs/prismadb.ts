import { PrismaClient } from "@prisma/client";

// Declare a global variable to hold the PrismaClient instance.
declare global {
  /**
   * The Prisma Client instance used for database operations.
   * @type {PrismaClient | undefined}
   */
  var prisma: PrismaClient | undefined;
}

// Create a Prisma Client instance or use the existing one from the global context.
const client = globalThis.prisma || new PrismaClient();

// Store the Prisma Client instance in the global context during development.
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
