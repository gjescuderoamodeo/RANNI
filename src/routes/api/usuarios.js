import prismaImport from '@prisma/client'
import jwt from "jsonwebtoken";
//import {}

const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function get() {
    let usuarios = await prisma.usuario.findMany({
        select: {
            id: true,
            nombre: true,
            puesto_laboral: true
        }
    })

    return {
        body: usuarios,
        status: 200,
    };
}

//eliminar usuarios
export async function del({ request }) {
    let body = await request.json();

    let tokenID = await getToken({ request });

    if (body.id === tokenID.id) {
        console.log("!QUIETO PARAO");
        body = {
            message: "No puedes borrar tu usuario",
            status: 403,
        };
        return {
            body,
        };
    } else {
        const deleteUser = await prisma.usuario.delete({
            where: {
                id: body.id,
            },
        });

        body = {
            message: "usuario borrado exitosamente",
            status: 200,
        };

        return {
            body,
        };
    }
}

async function getToken({ request }) {
    const token = request.headers
        .get("cookie")
        .split(";")
        .find((cookie) => cookie.indexOf("jwt") !== -1)
        .split("=")[1];

    //console.log(jwt.verify(token, "shhhhhhh"));

    let tok = jwt.verify(token, "shhhhhhh")
    return tok;

}

