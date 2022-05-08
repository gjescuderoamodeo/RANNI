import prismaImport from '@prisma/client'
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

//función que da en número de usuarios totales
export async function get({ request }) {
    //compruebo que existe una jwt
    try {
        let numUsuarios = await prisma.usuario.count();
        return {
            body: numUsuarios,
            status: 200
        };
    } catch (error) {
        console.log(error);

        return {
            body: null,
            status: 403
        };
    }




}