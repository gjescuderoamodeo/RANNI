import prismaImport from '@prisma/client'

const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

//actualizar estado pedido
export async function put({ request }) {

    let body = await request.json();

    try {
        //compruebo que existe el plato
        const getPlatePut = await prisma.plato.findFirst({
            where: {
                id: body.id_plato
            }
        })

        if (getPlatePut) {
            const putPlate = await prisma.plato_Pedido.update({
                data: {
                    estado: 'Confirmado',
                },
                where: {
                    id_plato: body.id_plato,
                },
            });

            if (putPlate) {
                return {
                    status: 200
                }
            }

        } else {
            return {
                status: 400
            }
        }

    } catch (error) {
        console.log(error);
        return {
            status: 400
        }
    }


}