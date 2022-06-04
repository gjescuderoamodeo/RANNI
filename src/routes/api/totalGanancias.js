import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;


//función que da las ganancias totales en las facturas
export async function get() {
    //compruebo que existe una jwt
    try {
        let facturas = await prisma.factura.findMany();

        let total = 0;

        for (let i = 0; i < facturas.length; i++) { 
            total+=facturas[i].precio;
        }

        return {
            body: total,
            status: 200
        };
    } catch (error) {
        console.log(error);

        return {
            body: 0,
            status: 403
        };
    }

}
