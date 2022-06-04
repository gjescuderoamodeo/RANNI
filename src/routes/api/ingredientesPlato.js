import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;


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

