import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient
export async function ResetDb(){
    await prisma.$transaction([
        prisma.sum.deleteMany()
    ])
    // in tranction so that all will be get deleted 
}