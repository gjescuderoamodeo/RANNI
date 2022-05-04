<script>
    //importaciones de otros módulos
    import AddIngredients from "./components/addIngredients.svelte";
    import ListIngredients from "./components/listIngredients.svelte";
</script>

<div class="flex flex-row flex-wrap flex-grow mt-2">
    <div class="w-full md:w-1/2 p-3">
        <!--Graph Card-->
        <div class="bg-white border rounded shadow">
            <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Ingredientes</h5>
            </div>
            <div class="pb-40 ">
                <ListIngredients />
            </div>
        </div>
        <!--/Graph Card-->
    </div>

    <div class="w-full md:w-1/2 p-3">
        <!--Graph Card-->
        <div class="bg-white border rounded shadow">
            <div class=" border-b p-3">
                <h5 class="font-bold  uppercase text-gray-600">
                    Añadir Ingredientes
                </h5>
            </div>
            <div class="pb-40 bg-white-200">
                <AddIngredients />
            </div>
        </div>
        <!--/Graph Card-->
    </div>
</div>
