import prismaImport from '@prisma/client';

const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function get() {

    let facturas = await prisma.factura.findMany({
        select: {
            fecha: true,
            precio: true,
        },
        orderBy:{
            fecha: 'desc'
        }
    })
    
    

    //variable para modificar la fecha de la factura y que se vea mejor
    let facturasMejorado = facturas

    //console.log(facturas)

    for (let i = 0; i < facturas.length; i++) { 
        
        //console.log(facturas[i].fecha.toUTCString())
    }
    
    return {
        body: facturas,
        status: 200,
    };
}