import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;


export async function get() {
    try {

        const result = await prisma.pedido.findMany(
            {
                where:{
                    finalizado:false
                }
            }
        );

        let body;

        if (!result) {
            body = {
                status: 400,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                pedido: result,
                status: 200,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        //console.log(errors);
    }



}
