import prismaImport from '@prisma/client'
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function post({ request }) {
    const json = await request.json();

    try {

        const result = await prisma.plato_Pedido.deleteMany({
            where: {
                plato_id: json.id
            }
        })

        let body;

        if (!result) {
            body = {
                message: "Error deleting pedido",
                status: 500,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                message: "pedido deleted",
                status: 200,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        console.log(errors);
        body = {
            status: 400,
        };
        return {
            body,
        };
    }



}