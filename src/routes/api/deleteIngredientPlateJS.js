import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;


export async function del({ request }) {

    try{
    let body = await request.json();

    const deleteIngredientPlate = await prisma.plato_Ingrediente.deleteMany({
        where: {
            ingrediente_id: body.id,
            plato_id: body.plato_id
        },
    });

    if(deleteIngredientPlate){
        return {
            status: 200
        };
    }else{
        return {
            status: 400
        };
    }
}catch(error){
    console.log(error)
    return {       
        status: 403
    };
}
    


}
