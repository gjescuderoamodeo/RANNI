import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;


export async function post({ request }) {
    const json = await request.json();
    try {

        //saco el id del pedido
        let idPedido = json.pedidoDeLaMesa.id;

        //saco el primer pedido que encuentre que no esté finalizado y que tenga ese id
        const result = await prisma.pedido.findFirst({
            where: { finalizado: false, id: idPedido }
        })

        //tras obtener el pedido saco la tabla plato-pedido todo lo relacionado con dicho pedido
        const resultPlatoPedido = await prisma.plato_Pedido.findMany({
            where: { pedido_id: result.id }
        })

        //Ahora recorro el array de resultPlatoPedido y voy sacando uno a uno sus nombres, sus cantidades y las voy guardadndo en un diccionario 
        //y luego en un array
        let arrayDiccionarioPlatoPedido = []

        for (let i = 0; i < resultPlatoPedido.length; i++) {
            let platoDelPedido = await prisma.plato.findFirst({
                where: { id: resultPlatoPedido[i].plato_id }
            });

            let cantidad = resultPlatoPedido[i].cantidad;
            let status = resultPlatoPedido[i].estado;

            //lo meto todo en un diccionario
            let diccionario = {
                id: platoDelPedido.id,
                nombre: platoDelPedido.nombre,
                precio: platoDelPedido.precio,
                cantida: cantidad,
                estado: status,
            };

            arrayDiccionarioPlatoPedido.push(diccionario);

        }

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
                array: arrayDiccionarioPlatoPedido,
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

export async function get() {
    try {

        const result = await prisma.plato_Pedido.findMany();

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
                platoPedido: result,
                status: 200,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        
        //console.log(errors);
        body = {
            status: 503,
        };
        // return validation errors
        return {
            body,
        };
    }

}
