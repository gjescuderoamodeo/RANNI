<script>
  import { post } from "$lib/utils.js";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let verificar = false;
  let name = "";
  let name2 = "";
  let selected;
  let selected2;
  let quantity = 1;
  //listado con los ingredientes
  let ingredientes = [];
  //listado con los platos
  let platos = [];

  onMount(async () => {
    await verifyUser();
    await reload();
    setInterval(reloadPlatos, 9000);
  });

  async function reload() {
    const request = await fetch(`/api/ingredientes`);
    ingredientes = await request.json();
    //
    const request2 = await fetch(`/api/platos`);
    platos = await request2.json();
  }

  async function reloadPlatos() {
    const request2 = await fetch(`/api/platos`);
    platos = await request2.json();
    const request = await fetch(`/api/ingredientes`);
    ingredientes = await request.json();
  }

  async function verifyUser() {
    const request = await fetch("/auth/verifyUserAdmin").then((r) => r.json());
    if (request.status !== 200) {
      return goto("/");
    } else {
      verificar = true;
    }
  }

  async function submit(event) {
    verifyUser();
    if (selected != "" && selected2 != "" && quantity >= 1) {
      const request = await post(`/api/addIngredientsPlateJS`, {
        selected,
        selected2,
        quantity,
      });
      console.log(request.message);

      switch (request.status) {
        case 200:
          alert("Ingrediente añadido exitosamente");
          selected = "";
          quantity = 1;
          break;
        case 400:
          alert("El Ingrediente ya está añadido a ese plato");
          break;
      }
    } else {
      alert("introduzca un ingrediente válido");
    }
  }
</script>

{#if verificar}
  <body class="bg-white">
    <!--Registro usuario-->
    <div
      class="block p-6 rounded-lg shadow-lg bg-sky-200 max-w-sm mx-auto mt-32 "
    >
      <form on:submit|preventDefault={submit}>
        <label
          for="exampleInputPassword2"
          class="form-label inline-block mb-2 text-gray-700">Nombre Plato</label
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
              bind:value={selected}
              on:change={() => (name = "")}
              required
            >
              {#each platos as plato}
                <option>{plato.nombre}</option>
              {/each}
            </select>
          </div>
        </div>
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword2"
            class="form-label inline-block mb-2 text-gray-700"
            >Cantidad ingrediente</label
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
            bind:value={quantity}
            placeholder="cantidad"
            min="1"
            required
          />
        </div>

        <div class="form-group mb-6">
          <label
            for="exampleInputPassword2"
            class="form-label inline-block mb-2 text-gray-700"
            >Ingrediente</label
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
                {#each ingredientes as ingrediente}
                  <option>{ingrediente.nombre}</option>
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
        ease-in-out">Añadir Ingrediente al Plato</button
        >
      </form>
    </div>
  </body>
{/if}
