import prismaImport from '@prisma/client';
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function post({ request }) {
    const json = await request.json();

    try {        
        let body;

        //pedido de la mesa sin finalizar
        let pedido = await prisma.pedido.findFirst({
            where: {
                finalizado: false,
                mesa_id: json.mesaid
            },            
        }) 
        
        //lista platos del pedido
        let pedido_plato = await prisma.plato_Pedido.findMany({
            where: {
                pedido_id: pedido.id
            },            
        })

        //si hay algún plato sin finalizar
        for (let i = 0; i < pedido_plato.length; i++) {
            if(pedido_plato[i].estado!="Acabado"){
                body = {
                    message: "Pedido not ended",
                    status: 403,
                };
                return {
                    body,
                };
            }
        }
        
        body = {
            status: 200,
        };
        return {
            body,
        };  
        
        
    } catch (errors) {
        console.log(errors);
        body = {
            message: "Error with verify platos ended",
            status: 400,
        };
        return {
            body,
        };
    }



}