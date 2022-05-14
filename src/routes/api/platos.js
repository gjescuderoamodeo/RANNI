import prismaImport from '@prisma/client';

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

    enoughIngredientsForThatPlate();

    return {
        body: platos,
        status: 200,
    };
}

//comprobar que la cantidad de ingredientes es > 0
async function enoughIngredientsForThatPlate() {
    //primero sacar los platos
    let platos = await prisma.plato.findMany();

    try{
        for(let i = 0; i < platos.length; i++){
            //por cada plato compruebo sus ingredientes

            //lista con el registro de ingredientes de cada plato
            let platoIngrediente = await prisma.plato_Ingrediente.findMany({
                where: {
                    plato_id: platos[i].id
                }
            });             

            for(let i = 0; i < platoIngrediente.length; i++){
                //una vez sacado la lista saco su relación con ingredientes
                let ingredientePlato = await prisma.ingrediente.findFirst({
                    where: {
                        id: platoIngrediente[i].ingrediente_id
                    }
                });

                if(platoIngrediente[i].cantidad>ingredientePlato.cantidad){
                    let cambiarEstado = await prisma.plato.update({
                        data:{
                            disponible: false
                        },
                        where: {
                            id: platos[i].id
                        }
                    });
                }else{
                    let cambiarEstado = await prisma.plato.update({
                        data:{
                            disponible: true
                        },
                        where: {
                            id: platos[i].id
                        }
                    });
                }
            }

        }
    }catch(error){
        console.log(error);
    }
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

    try {
        //compruebo que existe el plato
        const getPlatePut = await prisma.plato.findFirst({
            where: {
                nombre: body.name
            }
        })

        if (getPlatePut) {
            if (body.newName != "") {
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

                if (putPlate) {
                    return {
                        status: 200
                    }
                }
            } else {
                const putIngredient = await prisma.plato.update({
                    data: {
                        precio: body.precio,
                        disponible: body.disponibilidad,
                    },
                    where: {
                        nombre: body.name,
                    },
                });
                if (putIngredient) {
                    return {
                        status: 200
                    }
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

