import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;


export async function get() {

    enoughIngredientsForThatPlate();

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

//comprobar que la cantidad de ingredientes es > 0
async function enoughIngredientsForThatPlate() {
    //primero sacar los platos
    let platos = await prisma.plato.findMany();

    try{
        //array id Platos de platoIngrediente
        let platoIngredienteId = []
        //aray solo id platos
        let PlatoId =[]

        for(let i = 0; i < platos.length; i++){
            //meto los datos de los id en la lista
            PlatoId.push(platos[i].id);

            //por cada plato compruebo sus ingredientes

            //lista con el registro de ingredientes de cada plato
            let platoIngrediente = await prisma.plato_Ingrediente.findMany({
                where: {
                    plato_id: platos[i].id
                }
            });           

            for(let y = 0; y < platoIngrediente.length; y++){
                //una vez sacado la lista saco su relación con ingredientes
                let ingredientePlato = await prisma.ingrediente.findFirst({
                    where: {
                        id: platoIngrediente[y].ingrediente_id
                    }
                });

                //meto los datos de los id en la lista
                if(!platoIngredienteId.includes(platoIngrediente[y].plato_id)){
                    platoIngredienteId.push(platoIngrediente[y].plato_id);
                }                
                //               
                if(platoIngrediente[y].cantidad>ingredientePlato.cantidad){
                    //console.log(platos[i].id)
                    let cambiarEstado = await prisma.plato.update({
                        data:{
                            disponible: false
                        },
                        where: {
                            id: platos[i].id
                        }
                    });
                    
                } if(platoIngrediente[y].cantidad<=ingredientePlato.cantidad){
                    let cambiarEstado2 = await prisma.plato.update({
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

        //si no esta el id del plato en la lista de la tabla plato_ingrediente
        //quiere decir que no tiene ingredientes, por lo que no está disponible
        for(let y = 0; y < PlatoId.length; y++){            
            if(!platoIngredienteId.includes(PlatoId[y])){
                let cambiarEstado = await prisma.plato.update({
                    data:{
                        disponible: false
                    },
                    where: {
                        id: PlatoId[y]
                    }
                });
            }
        }


    }catch(error){
        //console.log(error);
    }
}

//eliminar platos
export async function del({ request }) {
    let body = await request.json();

    await deleteIngredientPlate(body.id);

    const deletePlate = await prisma.plato.delete({
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

async function deleteIngredientPlate( id_plato ) {
    //borrar tambien los ingredientes_plato de ese plato
    let toLosplato_Ingrediente = await prisma.plato_Ingrediente.deleteMany({
        where: {
            plato_id: id_plato,
        },
        });    
   
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
        //console.log(error);
        return {
            status: 400
        }
    }

}

