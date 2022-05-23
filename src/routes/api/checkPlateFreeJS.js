import prismaImport from '@prisma/client'
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function post() {
    try {       

        const result = await prisma.plato_Pedido.findMany({
            select: {
                plato_id: true
             }
        })

        let body;

        if (result) {
            body = {                
                platesNotFree: result,
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