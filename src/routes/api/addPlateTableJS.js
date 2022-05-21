import prismaImport from '@prisma/client'
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function post({ request }) {
    const json = await request.json();

    try {

        const plato = await prisma.plato.findFirst({
            where: {
                id: json.plato
            }
        })

        let result = false;

        //compruebo que hay ingredientes suficientes para poder añadir el plato
        //esto es una lista
        let platoIngrediente = await prisma.plato_Ingrediente.findMany({
            where: {
                plato_id: plato.id
            }
        })

        //solo se hace si la cantidad te deja
        let teDejo = true;

        for(let i = 0; i < platoIngrediente.length; i++){
            
            let IngredientePlato = await prisma.ingrediente.findFirst({
                where: {
                    id: platoIngrediente[i].ingrediente_id
                }
            })

            if((platoIngrediente[i].cantidad*json.cantidad)>IngredientePlato.cantidad){
                teDejo=false;
            }
        }

        if(teDejo){
            if (plato.disponible) {
                result = await prisma.plato_Pedido.create({
                    data: {
                        plato_id: plato.id,
                        cantidad: json.cantidad,
                        pedido_id: json.id_pedido
                    }
                })
            }
    
    
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
        }else{
            body = {
                message: "No hay suficientes ingredientes para ese plato",
                status: 403,
            };
            return {
                body,
            };
        }
        
    } catch (errors) {
        //console.log(errors);
        body = {
            message: "plate alredy in the pedido",
            status: 400,
        };
        return {
            body,
        };
    }



}