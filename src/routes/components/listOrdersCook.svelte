<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { post } from "$lib/utils.js";

    onMount(async () => {
        await verifyUser();
        recargarListaPedidos();
        setInterval(recargarListaPedidos, 6000);
    });

    //variables
    let verificar = false;

    //listado con los platos
    let platos = [];

    //listado pedidos
    let pedidos = [];
    //listado plato_pedido
    let arrayDiccionarioPlatoPedido = [];

    //validar que el usuario es camarero
    async function verifyUser() {
        const request = await fetch("/auth/verifyUserCook").then((r) =>
            r.json()
        );
        if (request.status !== 200) {
            return goto("/");
        } else {
            verificar = true;
            await recargarListaPedidos();
        }
    }

    //función para recargar los pedidos
    async function recargarListaPedidos() {
        if (pedidos != null) {
            let request = await fetch("/api/listAllPedidosJS").then((r) =>
                r.json()
            );

            switch (request.status) {
                case 200:
                    pedidos = request.pedido;
                    console.log(pedidos);
                    recargarListaPlatoPedidos();
                    recargarListaPlatos();
                    break;
            }
        }
    }

    async function recargarListaPlatoPedidos() {
        let request = await fetch("/api/listPlatosPedidosJS").then((r) =>
            r.json()
        );

        switch (request.status) {
            case 200:
                arrayDiccionarioPlatoPedido = request.platoPedido;
                break;
        }
    }

    async function recargarListaPlatos() {
        let request = await fetch("/api/platos").then((r) => r.json());
        platos = request;
    }
</script>

{#if verificar}
    <!--Aqui aparecerán distintas cartas. En cada carta aparecerá Pedido mesa-listado platos y cantidad-opción a cambiar estado del PlatoPedido -->
    <!--Aqui debe ir un bucle en función del .length del array de pedidos-->
    {#each pedidos as pedido}
        <div class="w-full md:w-1/3 p-3">
            <!--Graph Card-->
            <div class="bg-white border rounded shadow">
                <div class=" border-b p-3">
                    <h5 class="font-bold  uppercase text-gray-600">
                        Pedido mesa: {pedido.mesa_id}
                    </h5>
                </div>
                <div class="pb-40 bg-white-200 pt-1">
                    <table class="table-auto w-full">
                        <thead>
                            <tr class="bg-sky-200 text-center">
                                <th
                                    class="
           w-1/3
           min-w-[160px]
           text-lg
           font-semibold
           text-black
           py-2
           lg:py-2
           px-3
           lg:px-2
           border-l border-transparent
           "
                                >
                                    Nombre plato
                                </th>
                                <th
                                    class="
           w-1/3
           min-w-[160px]
           text-lg
           font-semibold
           text-black
           py-2
           lg:py-2
           px-3
           lg:px-2
           "
                                >
                                    Cantidad
                                </th>
                                <!--Esto será un select con varios option para cambiar el estado del pedido-->
                                <th
                                    class="
           w-1/3
           min-w-[160px]
           text-lg
           font-semibold
           text-black
           py-2
           lg:py-2
           px-3
           lg:px-2
           "
                                >
                                    Estado pedido
                                </th>
                            </tr>
                        </thead>
                        <!--Listado de los platos-->
                        <tbody>
                            {#each arrayDiccionarioPlatoPedido as platopedido}
                                {#if platopedido.pedido_id === pedido.id}
                                    <!--saco los platos de dicho pedido-->
                                    {#each platos as plato}
                                        {#if plato.id === platopedido.plato_id}
                                            <tr>
                                                <td
                                                    class="
           text-center text-dark
           font-medium
           text-base
           py-1
           px-2
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
           py-1
           px-2
           bg-white
           border-b border-[#E8E8E8]
           "
                                                >
                                                    {platopedido.cantidad}
                                                </td>
                                                <td
                                                    class="
           text-center text-dark
           font-medium
           text-base
           py-1
           px-2
           bg-white
           border-b border-[#E8E8E8]
           "
                                                >
                                                    {platopedido.estado}
                                                </td>
                                            </tr>
                                        {/if}
                                    {/each}
                                {/if}
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
            <!--/Graph Card-->
        </div>
    {/each}
{/if}
