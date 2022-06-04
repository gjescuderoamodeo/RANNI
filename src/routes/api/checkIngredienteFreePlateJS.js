import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;


export async function post() {
    try {       

        const result = await prisma.plato_Ingrediente.findMany({
            select: {
                ingrediente_id: true
             }
        })

        let body;

        if (result) {
            body = {                
                ingredientsNotFree: result,
                status: 200,
            };
            return {
                body,
            };
        } else {
            body = {
                status: 403,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        //console.log(errors);
        body = {
            status: 400,
        };
        return {
            body,
        };
    }



}
