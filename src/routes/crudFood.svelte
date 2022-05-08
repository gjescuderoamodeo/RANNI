<script>
    //importaciones de otros módulos
    import AddIngredients from "./components/addIngredients.svelte";
    import AddPlate from "./components/addPlate.svelte";
    import AddIngredientsPlate from "./components/addIngredientsPlate.svelte";
    import ListIngredients from "./components/listIngredients.svelte";
    import ListPlates from "./components/listPlates.svelte";
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

<!--Divider-->
<hr class="border-b-2 border-gray-400 my-8 mx-4" />

<div class="flex flex-row flex-wrap flex-grow mt-2">
    <div class="w-full md:w-1/2 p-3">
        <!--Graph Card-->
        <div class="bg-white border rounded shadow">
            <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Platos</h5>
            </div>
            <div class="pb-40 ">
                <ListPlates />
            </div>
        </div>
        <!--/Graph Card-->
    </div>

    <div class="w-full md:w-1/2 p-3">
        <!--Graph Card-->
        <div class="bg-white border rounded shadow">
            <div class=" border-b p-3">
                <h5 class="font-bold  uppercase text-gray-600">
                    Añadir Platos
                </h5>
            </div>
            <div class="pb-40 bg-white-200">
                <AddPlate />
            </div>
        </div>
        <!--/Graph Card-->
    </div>

    <div class="w-full md:w-1/2 p-3">
        <!--Graph Card-->
        <div class="bg-white border rounded shadow">
            <div class=" border-b p-3">
                <h5 class="font-bold  uppercase text-gray-600">
                    Añadir Ingredientes al Plato
                </h5>
            </div>
            <div class="pb-40 bg-white-200">
                <AddIngredientsPlate />
            </div>
        </div>
        <!--/Graph Card-->
    </div>
</div>
