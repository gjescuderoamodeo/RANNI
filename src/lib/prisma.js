import prismaImport from '@prisma/client'

var singletonPrisma = (function(){

    var prisma;

    const { PrismaClient } = prismaImport;
   
    return {
      getPrisma: function() {
        if(!prisma) {  // si no ha instanciado
            prisma = new PrismaClient(); // generamos la instancia
        }
        // retorna a instancia ya sea la recién creada o la existente
        return prisma;
      }
    }
   
  })();
   
  // para crear la instancia del singleton
    const instanciaSingleton = singletonPrisma.getPrisma();
    export {instanciaSingleton};