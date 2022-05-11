import prismaImport from '@prisma/client'

const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function get() {
    let ingredientes = await prisma.ingrediente.findMany({
        select: {
            id: true,
            nombre: true,
            cantidad: true
        }
    })

    return {
        body: ingredientes,
        status: 200,
    };
}

//eliminar ingrediente
export async function del({ request }) {
    let body = await request.json();

    const deleteIngredient = await prisma.ingrediente.delete({
        where: {
            id: body.id,
        },
    });

    body = {
        message: "ingrediente borrado exitosamente",
        status: 200,
    };

    return {
        body,
    };
}

//actualizar ingrediente
export async function put({ request }) {

    let body = await request.json();

    try{
        //compruebo que existe el ingrediente
        const getIngredientPut = await prisma.ingrediente.findFirst({
            where: {
                nombre: body.name
            }
        })

        if(getIngredientPut){
            const putIngredient = await prisma.ingrediente.update({
                data: {
                    nombre: body.newName,
                    cantidad: body.cantidad,
                },
                where: {
                    nombre: body.name,
                },
            });
            if(putIngredient){
                return {
                    status: 200
                }
            }
        }else{
            return {
                status: 400
            }
        }


        
    }catch(error){
        return {
            status: 400
        }
    }
    
    
}
