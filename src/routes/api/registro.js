import prismaImport from '@prisma/client'
import { onMount } from 'svelte';
import encriptador from "$lib/encriptador";
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();


onMount(() => {
});

export async function post({ request }) {
    const body = await request.formData();
    const result = await prisma.usuario.findFirst({
        where: {
            nombre: body.name,
            contrasena: body.passwd
        },
    })

    if (result) {
        //sacar del result el valor del trabajo de ese usuario
        let trabajo = result.puesto_laboral;
        if (trabajo == "Administrador") {
            return {
                status: 303,
                headers: {
                    location: `/`
                }
            };
        }
    }

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
            location: `/fruits`
        }
    };

}