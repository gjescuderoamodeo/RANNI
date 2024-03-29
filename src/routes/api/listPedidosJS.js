import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;


export async function post({ request }) {
    const json = await request.json();
    try {

        const result = await prisma.pedido.findFirst({
            where: { finalizado: false, mesa_id: json.mesaid }
        })

        let body;

        if (!result) {
            body = {
                status: 401,
            };
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
        body = {
            status: 400,
        };
        // return validation errors
        return {
            body,
        };
    }



}
