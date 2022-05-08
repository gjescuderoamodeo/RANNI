import prismaImport from '@prisma/client'
//import {}

const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function get() {
    let platos = await prisma.plato.findMany({
        select: {
            id: true,
            nombre: true,
            precio: true,
            disponible: true
        }
    })

    return {
        body: platos,
        status: 200,
    };
}

//eliminar platos
export async function del({ request }) {
    let body = await request.json();

    const deleteIngredient = await prisma.plato.delete({
        where: {
            id: body.id,
        },
    });

    body = {
        message: "plato borrado exitosamente",
        status: 200,
    };

    return {
        body,
    };
}

