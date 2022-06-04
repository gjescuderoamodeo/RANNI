import {instanciaSingleton} from "../../lib/prisma.js";

const prisma = instanciaSingleton;


export async function get() {
    let mesas = await prisma.mesa.findMany();

    return {
        body: mesas,
        status: 200,
    };
}

export async function del({ request }) { 
    let body = await request.json();

    const deleteTable = await prisma.mesa.delete({
        where: {
            id: body.id,
        },
    });
    

    body = {
        message: "mesa borrada exitosamente",
        status: 200,
    };

    return {
        body,
    };
}

//actualizar usuario
export async function put({ request }) {

    let body = await request.json();

    try{
        //compruebo que existe el usuario
        const getTablePut = await prisma.mesa.findFirst({
            where: {
                id: body.id
            }
        })


        if(getTablePut){
            const putTable = await prisma.mesa.update({
                data: {
                    id: body.newid,
                },
                where: {
                    id: body.id,
                },
            });
            if(putTable){
                return {
                    status: 200
                }
            }
        }else{
            return {
                status: 400
            }
        }


        
    }catch(error){
        return {
            status: 400
        }
    }
    
    
}

