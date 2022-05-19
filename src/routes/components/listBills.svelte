<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { post } from "$lib/utils.js";

  let facturas = [];
  let facturaid = null;
  let userName = "";
  let pedidoDeLaFactura;

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

    //para poner las fechas mejor
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

  //función para sacar el pedido de la factura asociado
  async function PedidoFactura(pedido_id) {
    verifyUser();
    facturaid = pedido_id;
    pedidoDeLaFactura = null;

    const request = await post(`/api/pedidosFacturaJS`, {
      pedido_id,
    });

    switch (request.status) {
      case 200:
        pedidoDeLaFactura = request.pedido;
        UsuarioPedido(pedidoDeLaFactura.usuario_id);
        break;
    }

    //saco tbm los platos del pedido
    if (pedidoDeLaFactura != null) {
      //console.log(pedido_id);
      recargarListaPlatos();
    }
  }

  async function UsuarioPedido(userId) {
    userName = "";

    const request = await post(`/api/userPedidoJS`, {
      userId,
    });

    switch (request.status) {
      case 200:
        userName = request.usuario;
        break;
    }
  }

  //función para recargar los platos del pedido de dicha factura
  async function recargarListaPlatos() {
    const request2 = await post(`/api/listPlatosPedidoFacturasJS`, {
      pedidoDeLaFactura,
    });

    switch (request2.status) {
      case 200:
        arrayDiccionarioPlatoPedido = request2.array;
        break;
    }
  }

  function quitarid() {
    facturaid = null;
    arrayDiccionarioPlatoPedido = [];
  }
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
                            Total
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
                              ><button
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                on:click={PedidoFactura(factura.pedido_id)}
                              >
                                Pedido de la factura
                              </button>
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
      <!--/Graph Card-->

      {#if facturaid != null}
        <div class="w-full md:w-1/2 p-3">
          <!--Graph Card-->
          <div class="bg-white border rounded shadow">
            <div class=" border-b p-3">
              <h5 class="font-bold  uppercase text-gray-600">
                Pedido de la factura
              </h5>
            </div>

            <div class="pb-40 bg-white ">
              {#if arrayDiccionarioPlatoPedido.length !== 0}
                <!--PLATOS ASOCIADOS A ESE PEDIDO-->
                <h5 class="font-bold uppercase text-gray-600 text-center mt-4">
                  Información del pedido realizado por: {userName}
                </h5>

                <!--tabla con los platos-->
                <div class="w-full overflow-x-auto">
                  <table class="table-auto w-full" id="exportable_table">
                    <thead>
                      <tr class="bg-sky-200 text-center">
                        <th
                          class="
                           w-10
                           text-lg
                           font-semibold
                           text-black
                           py-2
                           lg:py-7
                           px-1
                           lg:px-4
                           border-l border-transparent
                           "
                        >
                          Nombre plato
                        </th>
                        <th
                          class="
                           w-1
                           text-lg
                           font-semibold
                           text-black
                           py-2
                           lg:py-7
                           px-1
                           lg:px-4
                           "
                        >
                          Cantidad
                        </th>
                        <th
                          class="
                           w-1
                           text-lg
                           font-semibold
                           text-black
                           py-2
                           lg:py-7
                           px-1
                           lg:px-4
                           "
                        >
                          Precio
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each arrayDiccionarioPlatoPedido as plato}
                        <tr>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-2
                           px-1
                           bg-[#F3F6FF]
                           border-b border-l border-[#E8E8E8]
                           "
                          >
                            {plato.nombre}
                          </td>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-2
                           px-1
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                          >
                            X{plato.cantida}
                          </td>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-2
                           px-1
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                          >
                            {plato.precio}€
                          </td>
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                </div>
              {/if}
            </div>
          </div>
          <!--/Graph Card-->
        </div>
      {/if}
    </div>
  {/if}
</body>
