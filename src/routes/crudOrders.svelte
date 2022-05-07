<script>
    //importaciones de otros módulos
    import ListTables from "./components/listTables.svelte";
</script>

<div class="flex flex-row flex-wrap flex-grow mt-2">
    <div class="w-full md:w-1/2 p-3">
        <!--Graph Card-->
        <div class="bg-white border rounded shadow">
            <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Mesas</h5>
            </div>
            <div class="pb-40 ">
                <ListTables />
            </div>
        </div>
        <!--/Graph Card-->
    </div>

    <div class="w-full md:w-1/2 p-3">
        <!--Graph Card-->
        <div class="bg-white border rounded shadow">
            <div class=" border-b p-3">
                <h5 class="font-bold  uppercase text-gray-600">Pedido</h5>
            </div>
            <div class="pb-40 bg-white-200" />
        </div>
        <!--/Graph Card-->
    </div>
</div>
