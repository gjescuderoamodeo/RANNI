import prismaImport from '@prisma/client'
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function post({ request }) {
    const json = await request.json();
    try {
        const user = await prisma.usuario.findFirst({
            select: { nombre: true } 
            ,where: { id: json.userId }
        })

        let body;

        if (!user) {
            body = {
                status: 400,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                usuario: user.nombre,
                status: 200,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        console.log(errors);
    }

}