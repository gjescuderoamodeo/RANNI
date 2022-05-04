import prismaImport from '@prisma/client'
//import {}

const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function get() {
    let ingredientes = await prisma.ingrediente.findMany({
        select: {
            id: true,
            nombre: true,
            cantidad: true
        }
    })

    return {
        body: ingredientes,
        status: 200,
    };
}

//eliminar usuarios
export async function del({ request }) {
    let body = await request.json();

    const deleteIngredient = await prisma.ingrediente.delete({
        where: {
            id: body.id,
        },
    });

    body = {
        message: "ingrediente borrado exitosamente",
        status: 200,
    };

    return {
        body,
    };
}

