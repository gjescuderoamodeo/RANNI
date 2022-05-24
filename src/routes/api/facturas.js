import prismaImport from '@prisma/client';

const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

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