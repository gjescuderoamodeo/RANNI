<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { post } from "$lib/utils.js";
  import ModifyIngredients from "./modifyIngredients.svelte";

  let ingredientes = [];
  let ingredientesCopia = [];
  var ingredientesNotFree = [];
  let verificar = false;

  onMount(async () => {
    await verifyUser();
    await reload();
    setInterval(reload, 6000);
  });
  async function reload() {
    comprobarIngredienteLibre();
    const request = await fetch(`/api/ingredientes`);
    ingredientes = await request.json();
    ingredientesCopia = JSON.parse(JSON.stringify(ingredientes));
  }

  async function verifyUser() {
    const request = await fetch("/auth/verifyUserAdmin").then((r) => r.json());
    if (request.status !== 200) {
      return goto("/");
    } else {
      verificar = true;
    }
  }

  async function del(id) {
    verifyUser();
    const request = await fetch("/api/ingredientes", {
      body: JSON.stringify({ id }),
      method: "delete",
    }).then((r) => r.json());

    switch (request.status) {
      case 200:
        reload();
        break;
    }
  }

  //función para comprobar que el ingrediente no está asociado a ningún plato o pedido
  async function comprobarIngredienteLibre() {
    verifyUser();
    let request = await post(`/api/checkIngredienteFreePlateJS`);

    switch (request.status) {
      case 200:
        let ingridientsNF = request.ingredientsNotFree;

        ingredientesNotFree = [];
        for (let i = 0; i < ingridientsNF.length; i++) {
          ingredientesNotFree.push(ingridientsNF[i].ingrediente_id);
        }

        break;
      case 403:
        return false;
    }
  }

  const buscarIngrediente = (id) =>
    usuariosCopia.find((ingredientes) => ingredientes.id == id);
</script>

<head>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
    integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
    crossorigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
  />
  <!--Replace with your tailwind.css once created-->
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"
    integrity="sha256-XF29CBwU1MWLaGEnsELogU6Y6rcc5nCkhhx89nFMIDQ="
    crossorigin="anonymous"></script>
</head>

{#if verificar}
  <body>
    <div>
      <!--Listado ingredientes-->

      <!-- component -->
      <script src="https://cdn.tailwindcss.com"></script>
      <link
        rel="stylesheet"
        href="https://cdn.tailgrids.com/tailgrids-fallback.css"
      />
      <script
        defer
        src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

      <!-- ====== Table Section Start -->
      <section class="bg-white py-20 lg:py-[120px]">
        <h1 class="text-center font-bold text-3xl py-4 border-b mb-10">
          Listado Ingredientes
        </h1>
        <div class="container">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4">
              <div class="max-w-full overflow-x-auto">
                {#if ingredientes.length > 0}
                  <table class="table-auto w-full">
                    <thead>
                      <tr class="bg-sky-200 text-center">
                        <th
                          class="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-black
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-l border-transparent
                           "
                        >
                          Nombre
                        </th>
                        <th
                          class="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-black
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                        >
                          Cantidad
                        </th>
                        <th
                          class="
                           w-1/6
                           min-w-[160px]
                           text-lg
                           font-semibold
                           text-black
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                        >
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each ingredientes as ingrediente}
                        <tr>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-l border-[#E8E8E8]
                           "
                          >
                            {ingrediente.nombre}
                          </td>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Número de ingredientes en el almacen"
                          >
                            {ingrediente.cantidad}
                          </td>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                          >
                            {#if !ingredientesNotFree.includes(ingrediente.id)}
                              <p
                                class="text-black-400 hover:text-red-800 ml-2"
                                on:click={() => del(ingrediente.id)}
                              >
                                Eliminar
                                <i class="fa fa-trash fa-fw mr-3" />
                              </p>
                            {:else}
                              <p
                                class="text-grey-400 ml-2"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title="Este ingrediente no se puede eliminar porque pertenece a un plato"
                              >
                                -
                              </p>
                            {/if}
                          </td>
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                {:else}
                  <h1 class="text-center font-bold text-red-500 text-xl py-1 ">
                    No hay ingredientes actualmente
                  </h1>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- ====== Table Section End -->
    </div>
    <ModifyIngredients />
  </body>
{/if}
