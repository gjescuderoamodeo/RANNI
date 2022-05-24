import prismaImport from '@prisma/client';
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function post({ request }) {
    const json = await request.json();

    try {        
        let body;

        let cancelPedido = await prisma.pedido.deleteMany({
            where: {
                mesa_id: json.mesaid,
                finalizado: false
            },            
        }) 

        if (!cancelPedido) {
            body = {
                message: "Error cancel pedido",
                status: 500,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                message: "pedido cancel good",
                status: 200,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        //console.log(errors);
        body = {
            message: "Error cancel pedido",
            status: 400,
        };
        return {
            body,
        };
    }
}
