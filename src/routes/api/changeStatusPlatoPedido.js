import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
export default prisma;

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

            removeIngredientsFromAlmacen(getPlatePut.id,body.id_pedido);

            const putPlate = await prisma.plato_Pedido.updateMany({
                data: {
                    estado: 'Confirmado',
                    //estado: 'En_Proceso',
                },
                where: {
                    plato_id: body.id_plato,
                    pedido_id: body.id_pedido
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

//función para quitar al almacen la cantidad de los ingredientes
async function removeIngredientsFromAlmacen(platoide, pedidoide) {
    try{
        //lista con todos los ingredientes del plato (solo quiero sus id)
        platoIngredientes = await prisma.plato_Ingrediente.findMany({
            select:{
                cantidad: true,
                ingrediente_id: true,
                plato_id: true
            },
            where: {
                plato_id: platoide,
            }
        })  


        //una vez sacado la lista, recorro dicha lista y resto las cantidades a los ingredientes
        for (let i = 0; i < platoIngredientes.length; i++) { 
            let cantidadI = await prisma.ingrediente.findFirst({
                select:{
                    cantidad: true,
                },
                where:{
                    id: platoIngredientes[i].ingrediente_id
                }
            })

            //cantiad de dicho plato en el pedido
            let cantidadP = await prisma.plato_Pedido.findFirst({
                select:{
                    cantidad: true,
                },
                where:{
                    pedido_id: pedidoide,
                    plato_id: platoIngredientes[i].plato_id
                }
            })

            let newCantidad = (cantidadI.cantidad-(platoIngredientes[i].cantidad*cantidadP.cantidad))

            console.log(platoIngredientes[i].ingrediente_id)

            let actualizarCantidadIngrediente = await prisma.ingrediente.update({
                data: {
                    cantidad: newCantidad,
                },
                where: {
                    id: platoIngredientes[i].ingrediente_id,
                },
            });
        }

        

    }catch (error) {
        console.log(error);
        console.log("Error al remover los ingredientes");
        return {
            status: 400
        }
    }

}

//borrar plato del pedido
export async function del({ request }) {

    let body = await request.json();

    try {
        //compruebo que existe el plato
        const getPlateDel = await prisma.plato.findFirst({
            where: {
                id: body.id_plato
            }
        })

        if (getPlateDel) {   

            const delPlate = await prisma.plato_Pedido.deleteMany({
                where: {
                    plato_id: body.id_plato,
                    pedido_id: body.id_pedido,
                },
            });

            if (delPlate) {
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

//actualizar estado pedido a finalizado
export async function post({ request }) {

    let body = await request.json();

    try {
        //compruebo que existe el plato
        const getPlatePut = await prisma.plato.findFirst({
            where: {
                id: body.id_plato
            }
        })

        if (getPlatePut) {   

            const putPlate = await prisma.plato_Pedido.updateMany({
                data: {
                    estado: 'Acabado',
                },
                where: {
                    plato_id: body.id_plato,
                    pedido_id: body.id_pedido,
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
