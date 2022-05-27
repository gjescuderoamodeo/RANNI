import Prisma, * as PrismaScope from "@prisma/client";
const PrismaClient = Prisma?.PrismaClient || PrismaScope?.PrismaClient;
const prisma = new PrismaClient();
export default prisma;


export async function get() {

    let facturas = await prisma.factura.findMany({
        select: {
            pedido_id: true,
            fecha: true,
            precio: true,
        },
        orderBy:{
            fecha: 'desc'
        }
    })
    
    
    
    return {
        body: facturas,
        status: 200,
    };
}
