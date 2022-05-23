import prismaImport from '@prisma/client'
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

/* export async function post({ request }) {
    const json = await request.json();
    try {       

        const result = await prisma.plato_Ingrediente.findFirst({
            where: {
                ingrediente_id: json.ingredienteId
             }
        })

        let body;

        if (result) {
            body = {
                status: 403,
            };
            return {
                body,
            };
        } else {
            body = {
                status: 200,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        //console.log(errors);
        body = {
            status: 400,
        };
        return {
            body,
        };
    }



} */

export async function post() {
    try {       

        const result = await prisma.plato_Ingrediente.findMany({
            select: {
                ingrediente_id: true
             }
        })

        let body;

        if (result) {
            body = {                
                ingredientsNotFree: result,
                status: 200,
            };
            return {
                body,
            };
        } else {
            body = {
                status: 403,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        //console.log(errors);
        body = {
            status: 400,
        };
        return {
            body,
        };
    }



}