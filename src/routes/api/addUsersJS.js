import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
export default prisma;


import password from "$lib/password";



export async function post({ request }) {
    const json = await request.json();

    let contrasenaEncriptada = await password.encrypt(json.password);

    try {

        const result = await prisma.usuario.create({
            data: {
                nombre: json.name,
                puesto_laboral: json.job,
                contrasena: contrasenaEncriptada
            }
        })

        let body;

        if (!result) {
            body = {
                message: "Error creating user",
                status: 500,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                message: "user created good",
                status: 300,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        body = {
            message: "user alredy in the database",
            status: 400,
        };
        return {
            body,
        };
    }



}
