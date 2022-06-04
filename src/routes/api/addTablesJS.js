import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;


import password from "$lib/password";



export async function post({ request }) {
    const json = await request.json();

    try {

        const result = await prisma.mesa.create({
            data: {
                id: json.id,
            }
        })

        let body;

        if (!result) {
            body = {
                message: "Error creating table",
                status: 500,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                message: "table created good",
                status: 300,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        body = {
            message: "table alredy in the database",
            status: 400,
        };
        return {
            body,
        };
    }



}
