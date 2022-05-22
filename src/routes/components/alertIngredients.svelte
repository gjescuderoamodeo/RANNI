<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  //variables
  let verificar = false;
  let listaAlerta = [];

  onMount(async () => {
    await verifyUser();
    await alertIngredients();
    setInterval(alertIngredients, 9000);
  });

  async function verifyUser() {
    const request = await fetch("/auth/verifyUserAdmin").then((r) => r.json());
    if (request.status !== 200) {
      return goto("/");
    } else {
      verificar = true;
    }
  }

  //función que llama a un endPoint que trae una lista de los ingredientes con cantidades almacenadas en el inventario menores, iguales o próximos a 0
  async function alertIngredients() {
    verifyUser();
    const request = await fetch("/api/ingredientes", {
      method: "post",
    }).then((r) => r.json());

    console.log(request);

    switch (request.status) {
      case 200:
        listaAlerta = request.alert;
        break;
      case 203:
        listaAlerta = [];
        break;
    case 400:
        listaAlerta = [];
        break;
    }
  }
</script>

{#if verificar}
  {#if listaAlerta.length != 0}
  <!--Divider-->
    <hr class="border-b-2 border-gray-400 my-8 mx-4" />
    <div class="w-full md:w-1/2 p-3">
      <!--Graph Card-->
      <div class="bg-white border rounded shadow">
        <div class=" border-b p-3">
          <h5 class="font-bold  uppercase text-gray-600">
            Ingredientes excasos<img
              src="/alert.png"
              class="fill-current float-right h-6 ml-300"
              alt="alert ingredients"
            />
          </h5>
        </div>
        <div class="pb-40 bg-white-200">
          {#each listaAlerta as alertaIngrediente}
            <p class="font-bold uppercase text-red-600 text-center">
              Quedan pocos ingredientes de {alertaIngrediente.nombre}
            </p>
          {/each}
        </div>
      </div>
      <!--/Graph Card-->
    </div>
  {/if}
{/if}
