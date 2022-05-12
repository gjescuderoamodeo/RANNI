import prismaImport from '@prisma/client'
//import {}

const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function get() {
    let platos = await prisma.plato.findMany({
        select: {
            id: true,
            nombre: true,
            precio: true,
            disponible: true
        }
    })

    return {
        body: platos,
        status: 200,
    };
}

//eliminar platos
export async function del({ request }) {
    let body = await request.json();

    const deleteIngredient = await prisma.plato.delete({
        where: {
            id: body.id,
        },
    });

    body = {
        message: "plato borrado exitosamente",
        status: 200,
    };

    return {
        body,
    };
}

//actualizar platos
export async function put({ request }) {

    let body = await request.json();

    try{
        //compruebo que existe el plato
        const getPlatePut = await prisma.plato.findFirst({
            where: {
                nombre: body.name
            }
        })

        if(getPlatePut){
            if(body.newName!=""){
            const putPlate = await prisma.plato.update({
                data: {
                    nombre: body.newName,
                    precio: body.precio,
                    disponible: body.disponibilidad,
                },
                where: {
                    nombre: body.name,
                },
            });
            if(putPlate){
                return {
                    status: 200
                }
            }}else{
                const putIngredient = await prisma.plato.update({
                    data: {
                        precio: body.precio,
                        disponible: body.disponibilidad,
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

