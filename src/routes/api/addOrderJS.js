import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;

import jwt from "jsonwebtoken";

export async function post({ request }) {
    const json = await request.json();

    try {
        let body;

        const token = request.headers
            .get("cookie")
            .split(";")
            .find((cookie) => cookie.indexOf("jwt") !== -1)
            .split("=")[1];

        const user = jwt.verify(token, "shhhhhhh").id;

        const result2 = await prisma.pedido.findMany({
            where: {
                mesa_id: json.mesaid,
                usuario_id: user,
                finalizado: false
            }
        })

        //osea, si hay un pedido a esa mesa no finalizado, te dice que nanai
        if (result2 == []) {
            body = {
                message: "pedido no finalizado en esa mesa",
                status: 401,
            };
            return {
                body,
            };
        }

        const result = await prisma.pedido.create({
            data: {
                mesa_id: json.mesaid,
                usuario_id: user,
                finalizado: false
            }
        })



        if (!result) {
            body = {
                message: "Error adding pedido",
                status: 500,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                message: "pedido created good",
                status: 200,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        //console.log(errors);
        body = {
            message: "pedido alredy in the database",
            status: 400,
        };
        return {
            body,
        };
    }



}
