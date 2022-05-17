import prismaImport from '@prisma/client';
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export async function post({ request }) {
    const json = await request.json();

    try {        
        let body;

        //antes valido que no hay ningún plato sin terminar
        //tan simple como hacer consulta a plato pedido y si encuentra
        //algún plato con estado "sin finalizar" po no le deja crear factura
        let platoSinFinalizarC = await prisma.plato_Pedido.findMany({
            where: {
                estado: "Confirmado"
            },            
        }) 
        
        let platoSinFinalizarP = await prisma.plato_Pedido.findMany({
            where: {
                estado: "En_Proceso"
            },            
        }) 

        console.log(platoSinFinalizarC);

        if(platoSinFinalizarC==[] || platoSinFinalizarP==[]){
            body = {
                status: 403,
            };
            return {
                body,
            };
        }else{
        //pillo el pedido
        const result2 = await prisma.pedido.findFirst({
            where: {
                mesa_id: json.mesaid,
                finalizado: false
            },            
        })     
        
        //cambio el estado del pedido
        const changeStatusOrder = await prisma.pedido.update({
            data:{
                finalizado: true,
            },
            where: {
                id: result2.id,
            },            
        }) 


        //creo la factura
        const result = await prisma.factura.create({
            data: {
                pedido_id: result2.id,
                precio: json.totalPagar,
            }
        })



        if (!result) {
            body = {
                message: "Error adding pedido",
                status: 500,
            };
            // return validation errors
            return {
                body,
            };
        } else {
            body = {
                message: "pedido created good",
                status: 200,
            };
            return {
                body,
            };
        }
        }


        
    } catch (errors) {
        //console.log(errors);
        body = {
            message: "Error adding factura to the database",
            status: 400,
        };
        return {
            body,
        };
    }



}