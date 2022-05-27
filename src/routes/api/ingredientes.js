import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
export default prisma;


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
            
            if(body.newName!=""){
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
            }
            //si el nombre nuevo no es nada, es "", quiere decir que solo se quiere cambiar la cantidad
            else{
                const putIngredient = await prisma.ingrediente.update({
                    data: {
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


export async function post() {

    try{
    const alertIngridients = await prisma.ingrediente.findMany({
        select:{
            nombre: true
        },
        where: {
            cantidad: {
                lte: 20
            },
        },
    });

    if(alertIngridients.length>0){
        body = {
            alert: alertIngridients,
            status: 200,
        };
    
        return {
            body,
            status: 200
        };
    }else{
        body = {
            alert: alertIngridients,
            status: 203,
        };    
        return {
            body,
            status: 203
        };
    }
    }catch(error){
        //console.log(error);
        return {           
            status: 400
        }
    }  

    
}
