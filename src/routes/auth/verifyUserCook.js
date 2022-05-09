import jwt from "jsonwebtoken";

export async function get({ request }) {
    //compruebo que existe una jwt
    try {
        const token = request.headers
            .get("cookie")
            .split(";")
            .find((cookie) => cookie.indexOf("jwt") !== -1)
            .split("=")[1];

        //si existe token
        if (jwt.verify(token, "shhhhhhh").job == "Cocinero") {
            body = {
                name: jwt.verify(token, "shhhhhhh").username,
                status: 200,
            };
            return {
                body,
            };
        } else {
            return {
                status: 403
            };
        }

    } catch (error) {
        console.log(error);

        body = {
            status: 403,
        };

        return {
            body,
        };
    }




}