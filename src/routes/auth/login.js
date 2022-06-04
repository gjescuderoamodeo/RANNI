import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;

import jwt from "jsonwebtoken";
import passwords from "$lib/password";

export async function post({ request }) {

    //primero certifico el usuario y la contraseña
    try {

        const json = await request.json();

        const result = await prisma.usuario.findFirst({
            where: {
                nombre: json.name
            }
        })

        let puesto = "";

        if (!result) {
            body = {
                status: 401,
            };
            return {
                body,
            };
        } else {
            puesto = result.puesto_laboral;
        }

        //saco su contraseña y la desencripto
        const userInformation = result;
        const [hashedPassword, hash] = userInformation.contrasena.split(";");

        let operationStatus = await passwords.verify(json.name, hashedPassword, hash);

        //si la operación da que no ha sido posible, un false, devuelve un error 400
        if (!operationStatus) {
            return {
                status: 400,
                body: "ERROR 400"
            };
            //si se ha verificado, entonces meto los pertinenetes datos en el jwt    
        } else if (operationStatus) {

            //const json = result;
            const token = jwt.sign({ username: result.nombre, job: result.puesto_laboral, id: result.id }, "shhhhhhh");

            let body = {
                message: "Successfully logged in.",
            };

            switch (puesto) {
                case "Cocinero":
                    body = {
                        message: "Successfully logged in.",
                        status: 301,
                    };
                    return {
                        headers: {
                            "set-cookie": `jwt=${token}; Path=/;`,
                            location: `/`
                        },
                        body,
                    };
                case "Camarero":
                    body = {
                        message: "Successfully logged in.",
                        status: 302,
                    };
                    return {
                        headers: {
                            "set-cookie": `jwt=${token}; Path=/;`
                        },
                        body,
                    };
                case "Administrador":
                    body = {
                        message: "Successfully logged in.",
                        status: 303,
                    };
                    return {
                        headers: {
                            "set-cookie": `jwt=${token}; Path=/;`
                        },
                        body,
                    };

            }
        } else {
            return {
                status: 401,
                body: "Error login",
                headers: {
                    location: `/`
                }
            };
        }
    } catch (error) {
        return {
            status: 401
        };
        //console.log("ERROR AL CREAR EL TOKEN");
        //console.log(error);
    }

}

export async function get({ request }) {
    const token = request.headers
        .get("cookie")
        .split(";")
        .find((cookie) => cookie.indexOf("jwt") !== -1)
        .split("=")[1];

    //console.log(jwt.verify(token, "shhhhhhh"));
}
