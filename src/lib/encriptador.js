import prismaImport from '@prisma/client'
import password from "./password";
const { PrismaClient } = prismaImport;

const prisma = new PrismaClient();

export default {
    signUp: async () => {
        const encryptedPassword = await password.encrypt("admin");

        let operationStatus = await prisma.usuario.create({
            data: {
                nombre: "admin",
                contrasena: encryptedPassword,
                puesto_laboral: "Administrador",
            }
        })

        return operationStatus;
    },

    signIn: async (email, password) => {
        /*         let operationStatus;
        
                const userInformation = await user.getByEmail(email);
                try {
                    const [hashedPassword, hash] = userInformation.password.split(";");
        
                    operationStatus = await passwordManager.verify(password, hashedPassword, hash);
                } catch (err) {
                    operationStatus = false;
                }
        
                return operationStatus ? userInformation : null; */
    }
}