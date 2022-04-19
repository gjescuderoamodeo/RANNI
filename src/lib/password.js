import bcrypt from "bcryptjs";

export default {
    encrypt: async data => {
        const salt = await bcrypt.genSalt();
        return `${await bcrypt.hash(data, salt)};${salt}`;
    },
    verify: async (password, hashedPassword, hash) => {
        return (await bcrypt.hash(password, hash)) === hashedPassword;
    }
}

//hacer await en ambos
//nc = password.encrypt(c)

//password.verify(contraseñaFormulario,contraseñaSQL) 