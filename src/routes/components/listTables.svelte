<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { post } from "$lib/utils.js";

  let mesas = [];
  let pedidoDeLaMesa;
  let mesaid = null;
  let verificar = false;
  let todoClear = true;

  //listado con los platos
  let platos = [];
  let arrayDiccionarioPlatoPedido = [];

  //variables que guardan los datos de los platos a añadir al pedido
  let name2 = "";
  let cantidad;
  let selected2;

  //variable del total del pedido
  let totalPagar = 0;

  onMount(async () => {
    await verifyUser();
    await reload();
    setInterval(reload, 6000);
  });

  async function reload() {
    const request2 = await fetch(`/api/platos`);
    platos = await request2.json();
    const request = await fetch(`/api/mesas`);
    mesas = await request.json();
  }

  async function verifyUser() {
    const request = await fetch("/auth/verifyUserWaitress").then((r) =>
      r.json()
    );
    if (request.status !== 200) {
      return goto("/");
    } else {
      verificar = true;
    }
  }

  //función para recargar los platos del pedido
  async function recargarListaPlatos() {
    totalPagar = 0;
    if (pedidoDeLaMesa != null) {
      const request2 = await post(`/api/listPlatosPedidosJS`, {
        pedidoDeLaMesa,
      });

      switch (request2.status) {
        case 200:
          arrayDiccionarioPlatoPedido = request2.array;
          comprobarPlatosAcabados();
          break;
      }

      //saco el total a pagar. loop del array y sumo uno a uno la cantidad
      for (let i = 0; i < arrayDiccionarioPlatoPedido.length; i++) {
        totalPagar +=
          arrayDiccionarioPlatoPedido[i].precio *
          arrayDiccionarioPlatoPedido[i].cantida;
      }
    }
  }

  //función añadir platos al pedido
  async function añadirPlatoAPedido(event) {
    verifyUser();
    if (selected2 != "" && cantidad >= 1) {
      let id_pedido = pedidoDeLaMesa.id;
      let plato = selected2;

      const request = await post(`/api/addPlateTableJS`, {
        plato,
        cantidad,
        id_pedido,
      });
      //console.log(request.message);

      switch (request.status) {
        case 200:
          alert("Plato añadido exitosamente");
          selected2 = "";
          cantidad = 1;
          recargarListaPlatos();
          break;
        case 400:
          alert("El Plato ya está añadido a ese pedido");
          break;
        case 403:
          alert("No hay ingredientes suficientes para añadir ese plato");
          break;
      }
    } else {
      alert("introduzca un Plato válido");
    }
  }

  //función para añadir un pedido a la mesa
  //esta función coje el id de la mesa y el id del usuario. Posteriormente se crea en la bd
  async function añadirPedido() {
    verifyUser();
    const request = await post(`/api/addOrderJS`, {
      mesaid,
    });
    switch (request.status) {
      case 200:
        alert("Pedido creado exitosamente");
        mesaPedido(mesaid);
        break;
      case 400:
        alert("El Pedido ya está en la base de datos");
        break;
      case 401:
        alert(
          "NO PUEDES CREAR UN PEDIDO EN UNA MESA CON UN PEDIDO SIN FINALIZAR"
        );
        break;
    }
  }

  //función que saca el pedido relacionado a una mesa
  async function mesaPedido(id) {
    verifyUser();
    mesaid = id;
    pedidoDeLaMesa = undefined;
    arrayDiccionarioPlatoPedido = [];

    const request = await post(`/api/listPedidosJS`, {
      mesaid,
    });

    switch (request.status) {
      case 200:
        pedidoDeLaMesa = request.pedido;
        break;
      case 401:
        pedidoDeLaMesa = request.pedido;
        pedidoDeLaMesa = undefined;
        break;
    }

    //saco tbm los platos del pedido
    if (pedidoDeLaMesa != null) {
      recargarListaPlatos();
    }

    //console.log(request);
  }

  function quitarid() {
    mesaid = null;
    arrayDiccionarioPlatoPedido = [];
    //pedidoDeLaMesa = null;
    //console.log(pedidoDeLaMesa);
  }

  async function eliminarPlatoPedido(id) {
    verifyUser();
    let request = await post(`/api/deletePlatoPedidoJS`, {
      id,
    });
    switch (request.status) {
      case 200:
        console.log("plato del pedido eliminado");
        recargarListaPlatos();
        break;
      case 403:
        console.log(
          "No puedes eliminar este plato porque ya ha sido confirmado por el cocinero"
        );
        recargarListaPlatos();
        break;
    }
  }

  async function FinalizarPedido() {
    verifyUser();
    let request3 = await post(`/api/FinishOrderJS`, {
      mesaid,
      totalPagar,
    });

    switch (request3.status) {
      case 200:
        alert("Pedido finalizado exitosamente");
        quitarid();
        recargarListaPlatos();
        break;
      case 400:
        alert("Pedido NO finalizado exitosamente");
        break;
      case 401:
        alert("Pedido con platos sin terminar");
        break;
    }
  }

  //función para exportar una tabla a Excel
  function exportExcel(type, fn, dl) {
    var elt = document.getElementById("exportable_table");
    var wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });
    return dl
      ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
      : XLSX.writeFile(wb, fn || "Factura." + (type || "xlsx"));
  }

  function exportar() {
    exportExcel("xlsx");
  }

  //función que comprueba que todos los platos del pedido está terminados
  //en caso de estar todos acabados, permite emitir la factura
  async function comprobarPlatosAcabados() {
    verifyUser();
    let request = await post(`/api/verifyPlatesEndedJS`, {
      mesaid,
    });

    switch (request.status) {
      case 200:
        //alert("Pedido ok");
        todoClear = false;
        break;
      case 403:
        //alert("Pedido NO finalizado");
        todoClear = true;
        break;
    }
  }

  //función para cancelar un pedido sin platos
  async function cancelarPedido() {
    verifyUser();
    let request = await post(`/api/cancelPedidoJS`, {
      mesaid,
    });

    switch (request.status) {
      case 200:
        alert("Pedido cancelado");
        quitarid();
        break;
      case 403:
        //alert("Pedido NO finalizado");
        break;
    }
  }

  const buscarmesa = (id) => mesasCopia.find((mesa) => mesa.id == id);
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
          <div class="border-b p-3">
            <h5 class="font-bold uppercase text-gray-600">Mesas</h5>
          </div>
          <div class="pb-40 ">
            <div>
              <!--Listado mesas-->

              <!-- component -->
              <link
                rel="stylesheet"
                href="https://cdn.tailgrids.com/tailgrids-fallback.css"
              />
              <script
                defer
                src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

              <!-- ====== Table Section Start -->
              <section class="bg-white py-20 lg:py-[120px]">
                <div class="container">
                  <div class="flex flex-wrap -mx-4">
                    <div class="w-full px-4">
                      <div class="max-w-full overflow-x-auto">
                        <table class="table-auto w-full">
                          <tbody>
                            {#each mesas as mesa}
                              <tr>
                                <td
                                  class="
                           text-center text-dark font-dark
                           antialiased
                           font-medium
                           text-base
                           py-3
                           px-1
                           bg-stone-50
                           border-b border-l border-[#E8E8E8]
                           "
                                >
                                  {mesa.id}
                                  <p />
                                  <span
                                    class="text-green-500"
                                    on:click={mesaPedido(mesa.id)}
                                  >
                                    <div class="flex flex-wrap justify-center">
                                      <img
                                        src="/mesa.png"
                                        class="w-32 h-32 mt-1"
                                        alt="Mesa"
                                      />
                                    </div>
                                  </span></td
                                >
                              </tr>
                            {/each}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <!-- ====== Table Section End -->
            </div>
          </div>
        </div>
        <!--/Graph Card-->
      </div>
      {#if mesaid != null}
        <div class="w-full md:w-1/2 p-3">
          <!--Graph Card-->
          <div class="bg-white border rounded shadow">
            <div class=" border-b p-3">
              <h5 class="font-bold  uppercase text-gray-600">
                Pedido de la mesa {mesaid}
                {#if arrayDiccionarioPlatoPedido.length == 0 && pedidoDeLaMesa != null}
                  <img
                    src="/cancel.png"
                    class="fill-current float-right h-7 ml-2 bg-red-200"
                    alt="cancel pedido"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Cancelar pedido"
                    on:click={cancelarPedido}
                  />
                {/if}
              </h5>
            </div>

            <div class="pb-40 bg-white ">
              {#if pedidoDeLaMesa == null}
                <p class="font-bold text-center  uppercase">
                  No hay pedidos asociados a esta mesa
                </p>
                <div class="flex space-x-2 justify-center">
                  <button
                    class="mt-10
        px-6
        py-2.5
        bg-blue-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-green-700 hover:shadow-lg
        focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-green-800 active:shadow-lg
        transition
        duration-150
        ease-in-out"
                    on:click={añadirPedido}>Añadir pedido</button
                  >
                </div>
              {:else}
                <!--Menú para añadir platos al pedido-->
                <div
                  class="block p-6 rounded-lg shadow-lg bg-sky-200 max-w-sm mx-auto mt-32 "
                >
                  <form on:submit|preventDefault={añadirPlatoAPedido}>
                    <div class="form-group mb-6">
                      <label
                        for="exampleInputPassword2"
                        class="form-label inline-block mb-2 text-gray-700 text-lg"
                        >Cantidad</label
                      >
                      <!--input cantidad-->
                      <input
                        type="number"
                        class="form-control block
                              w-full
                              px-3
                              py-1.5
                              text-base
                              font-normal
                              text-gray-700
                              bg-white bg-clip-padding
                              border border-solid border-gray-300
                              rounded
                              transition
                              ease-in-out
                              m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleInputPassword2"
                        bind:value={cantidad}
                        placeholder="Cantidad"
                        required
                      />
                    </div>

                    <div class="form-group mb-6">
                      <label
                        for="exampleInputPassword2"
                        class="form-label inline-block mb-2 text-gray-700 text-lg"
                        >Plato</label
                      >
                      <div class="flex justify-center">
                        <div class="mb-3 xl:w-96">
                          <select
                            class="form-select appearance-none
                                            block
                                            w-full
                                            px-3
                                            py-1.5
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding bg-no-repeat
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example"
                            bind:value={selected2}
                            on:change={() => (name2 = "")}
                            required
                          >
                            <option value="" selected
                              >Seleccione un plato</option
                            >
                            {#each platos as Plato}
                              {#if Plato.disponible}
                                <option value={Plato.id}
                                  >{Plato.nombre}-{Plato.precio}€</option
                                >
                              {:else}
                                <option disabled class="text-red-700"
                                  >{Plato.nombre}-{Plato.precio}€-No disponible</option
                                >
                              {/if}
                            {/each}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="flex justify-center" />

                    <button
                      type="submit"
                      class="
                            w-full
                            px-6
                            py-2.5
                            bg-blue-600
                            text-white
                            font-medium
                            text-xs
                            leading-tight
                            uppercase
                            rounded
                            shadow-md
                            hover:bg-green-700 hover:shadow-lg
                            focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-green-800 active:shadow-lg
                            transition
                            duration-150
                            ease-in-out">Añadir Plato al Pedido</button
                    >
                  </form>
                </div>

                {#if arrayDiccionarioPlatoPedido.length !== 0}
                  <!--PLATOS ASOCIADOS A ESE PEDIDO-->
                  <h5
                    class="font-bold uppercase text-gray-600 text-center mt-6"
                  >
                    Platos del pedido
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
                            Nombre
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
                          <!--Confirmación de que todas los platos estan acabados -->
                          {#if todoClear}
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
                              Confirmado
                            </th>
                            <th
                              class="
                           w-1/6
                           text-lg
                           font-semibold
                           text-black
                           py-2
                           lg:py-7
                           px-1
                           lg:px-4
                           "
                            >
                              Acción
                            </th>
                          {/if}
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
                            {#if todoClear}
                              {#if plato.estado != "Acabado"}
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
                                  {plato.estado}
                                </td>
                              {:else}
                                <td
                                  class="
                           text-center text-red-500
                           font-medium
                           text-base
                           py-2
                           px-1
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                                >
                                  {plato.estado}
                                </td>
                              {/if}
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
                                {#if plato.estado == "En_Proceso"}
                                  <p
                                    class="text-black-400 hover:text-red-800 ml-2"
                                    on:click={eliminarPlatoPedido(plato.id)}
                                  >
                                    Eliminar
                                    <i class="fa fa-trash fa-fw mr-3" />
                                  </p>
                                {/if}
                              </td>
                            {/if}
                          </tr>
                        {/each}
                      </tbody>
                      <tfoot class="hidden">
                        <tr>
                          <td />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td />
                          <td />
                          <td>Total {totalPagar}€</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <h5
                    class="font-bold uppercase text-gray-600 text-right mt-6 mr-2"
                  >
                    Total a pagar: {totalPagar}€
                  </h5>

                  {#if !todoClear}
                    <button
                      class="
                    float-right
                            mt-4
                            mb-2
                            px-4
                            py-2.5
                            bg-blue-800
                            text-white
                            font-medium
                            text-sm
                            leading-tight
                            uppercase
                            rounded
                            shadow-md
                            hover:bg-orange-700 hover:shadow-lg
                            focus:bg-blue-900 focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-orange-800 active:shadow-lg
                            transition
                            duration-150
                            ease-in-out"
                      on:click={exportar}
                    >
                      Descargar factura<img
                        src="/DownloadExcel.png"
                        class="fill-current float-right h-5 ml-2"
                        alt="download excel"
                      />
                    </button>

                    <button
                      class="
                            w-full
                            mt-24
                            px-6
                            py-2.5
                            bg-blue-600
                            text-white
                            font-medium
                            text-sm
                            leading-tight
                            uppercase
                            rounded
                            shadow-md
                            hover:bg-green-700 hover:shadow-lg
                            focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-green-800 active:shadow-lg
                            transition
                            duration-150
                            ease-in-out"
                      on:click={FinalizarPedido}
                    >
                      Finalizar Pedido
                    </button>
                  {/if}
                {/if}
              {/if}
            </div>
          </div>
          <!--/Graph Card-->
        </div>
      {/if}
    </div>
  {/if}
</body>
