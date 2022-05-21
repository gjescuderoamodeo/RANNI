import prismaImport from '@prisma/client'
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function post({ request }) {
    const json = await request.json();

    try {

        let result2 = await prisma.plato_Pedido.findFirst({
            where: {
                plato_id: json.id,
                estado:"En_Proceso"
            }
        })
        
        if(result2.estado=="En_Proceso"){
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
        }else{
            body = {
                message: "pedido no esta en proceso, está confirmado",
                status: 403,
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