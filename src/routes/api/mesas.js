import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
export default prisma;


export async function get() {
    let mesas = await prisma.mesa.findMany();

    return {
        body: mesas,
        status: 200,
    };
}

