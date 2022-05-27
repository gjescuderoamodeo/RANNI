import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
export default prisma;


export async function get() {
    let ingredientePatos = await prisma.plato_Ingrediente.findMany({
        select: {
            ingrediente_id: true,
            plato_id: true,
            cantidad: true
        }
    })

    return {
        body: ingredientePatos,
        status: 200,
    };
}

