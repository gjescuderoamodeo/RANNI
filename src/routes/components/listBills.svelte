<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { post } from "$lib/utils.js";

  let facturas = [];
  let facturaid = null;

  let verificar = false;

  //listado con las facturas
  let arrayDiccionarioPlatoPedido = [];

  onMount(async () => {
    await verifyUser();
    await reload();
    setInterval(reload, 6000);
  });

  async function reload() {
    const request = await fetch(`/api/facturas`);
    facturas = await request.json();

    for (let i = 0; i < facturas.length; i++) {
      facturas[i].fecha = facturas[i].fecha.slice(0, 10);
    }
  }

  async function verifyUser() {
    const request = await fetch("/auth/verifyUserAdmin").then((r) => r.json());
    if (request.status !== 200) {
      return goto("/");
    } else {
      verificar = true;
    }
  }

  function quitarid() {}
</script>

<head>
  <title>Ranni</title>

  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
    integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
    crossorigin="anonymous"
  />
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"
    integrity="sha256-XF29CBwU1MWLaGEnsELogU6Y6rcc5nCkhhx89nFMIDQ="
    crossorigin="anonymous"></script>
</head>

<body>
  {#if verificar}
    <div class="flex flex-row flex-wrap flex-grow mt-2" on:dblclick={quitarid}>
      <div class="w-full md:w-1/2 p-3">
        <!--Graph Card-->
        <div class="bg-white border rounded shadow">
          <h1 class="text-center font-bold text-3xl py-4 border-b mb-10">
            Listado Facturas
          </h1>
          <div class="container">
            <div class="flex flex-wrap -mx-4">
              <div class="w-full px-4">
                <div class="max-w-full overflow-x-auto">
                  {#if facturas.length > 0}
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
                            Fecha
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
                            Precio
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
                            Pedido Asociado
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {#each facturas as factura}
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
                              {factura.fecha}
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
                              {factura.precio}€
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
                              Pedido de la factura
                            </td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  {:else}
                    <h1
                      class="text-center font-bold text-red-500 text-xl py-1 "
                    >
                      No hay facturas actualmente
                    </h1>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/Graph Card-->
  {/if}
</body>
