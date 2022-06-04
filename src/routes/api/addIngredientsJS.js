import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;

export async function post({ request }) {
    const json = await request.json();

    try {

        const result = await prisma.ingrediente.create({
            data: {
                nombre: json.name,
                cantidad: json.quantity
            }
        })

        let body;

        if (!result) {
            body = {
                message: "Error creating ingredient",
                status: 500,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                message: "ingredient created good",
                status: 200,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        body = {
            message: "ingredient alredy in the database",
            status: 400,
        };
        return {
            body,
        };
    }



}
