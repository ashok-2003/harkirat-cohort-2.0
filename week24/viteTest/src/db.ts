import { PrismaClient } from "./generated/prisma";

export const prismaClient = new PrismaClient();

// exporting form here so that we can mock the request  for the test as we don't want to populate data base in the test cases