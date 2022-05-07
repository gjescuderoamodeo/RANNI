import prismaImport from '@prisma/client'

const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function get() {
    let mesas = await prisma.mesa.findMany();

    return {
        body: mesas,
        status: 200,
    };
}

