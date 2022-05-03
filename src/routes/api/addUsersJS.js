import prismaImport from '@prisma/client'
import password from "$lib/password";
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function post({ request }) {
    const body = await request.formData();

    let contrasenaEncriptada = await password.encrypt(body.get("password"));

    const result = await prisma.usuario.create({
        data: {
            nombre: body.get("name"),
            puesto_laboral: body.get("job"),
            contrasena: contrasenaEncriptada
        }
    })

    if (!result) {
        // return validation errors
        return {
            status: 400,
            body: "ERROR 400"
        };
    }

    return {
        status: 303,
        headers: {
            location: `/addUsers`
        }
    };

}