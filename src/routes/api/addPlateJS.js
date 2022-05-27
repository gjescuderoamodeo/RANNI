import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
export default prisma;


export async function post({ request }) {
    const json = await request.json();
    //console.log(json);

    try {

        //primero creo el plato
        const result = await prisma.plato.create({
            data: {
                nombre: json.name,
                precio: json.prize
            }
        })



        let body;

        if (!result) {
            body = {
                message: "Error creating plato",
                status: 500,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                message: "plato created good",
                status: 200,
            };
            return {
                body,
            };
        }
    } catch (errors) {
        body = {
            message: "plato alredy in the database",
            status: 400,
        };
        return {
            body,
        };
    }



}
