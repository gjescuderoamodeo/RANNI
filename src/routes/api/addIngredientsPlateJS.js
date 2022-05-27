import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
export default prisma;


export async function post({ request }) {
    const json = await request.json();

    try {

        const cantidad = json.quantity;

        const plato = await prisma.plato.findFirst({
            where: {
                nombre: json.selected
            }
        })

        const ingrediente = await prisma.ingrediente.findFirst({
            where: {
                nombre: json.selected2
            }
        })

        const result = await prisma.plato_Ingrediente.create({
            data: {
                plato_id: plato.id,
                ingrediente_id: ingrediente.id,
                cantidad: cantidad
            }
        })

        let body;

        if (!result) {
            body = {
                message: "Error adding ingredient",
                status: 500,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                message: "ingredient added good",
                status: 200,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        body = {
            message: "ingredient alredy in the plate",
            status: 400,
        };
        return {
            body,
        };
    }



}
