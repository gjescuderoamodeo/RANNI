import prismaImport from '@prisma/client'
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function post({ request }) {
    const json = await request.json();

    try {

        const plato = await prisma.plato.findFirst({
            where: {
                nombre: json.plato
            }
        })


        const result = await prisma.plato_Pedido.create({
            data: {
                plato_id: plato.id,
                cantidad: json.cantidad,
                pedido_id: json.id_pedido
            }
        })

        let body;

        if (!result) {
            body = {
                message: "Error adding plate to pedido",
                status: 500,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                message: "plate added good",
                status: 200,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        console.log(errors);
        body = {
            message: "plate alredy in the pedido",
            status: 400,
        };
        return {
            body,
        };
    }



}