<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  //saco los nombres de los ingredientes
  let ingredientes = [];

  //variables
  let verificar = false;
  let name = "";
  let cantidad = 1;
  let newName = "";

  onMount(async () => {
    await verifyUser();
    await reload();
    setInterval(reload, 7000);
  });

  async function reload() {
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

  async function update() {
    let put = await fetch(`/api/ingredientes`, {
      body: JSON.stringify({ newName, name, cantidad }),
      method: "put",
    });
    if (put.status == 200) {
      alert("ingrediente modificado");
      name = "";
      cantidad = 1;
      newName = "";
      reload();
    } else {
      alert("error al modificar el ingrediente");
    }
  }
</script>

{#if verificar}
  <sl-dialog class="dialog-overview text-left font-bold ">
    <h5 class="tex-xl text-center text-2xl">Editar ingredientes</h5>
    <!-- -->
    <div
      class="block p-6 rounded-lg shadow-lg bg-sky-200 max-w-sm mx-auto mb-20"
    >
      <form>
        <div class="form-group mb-6">
          <label for="nombre" class="form-label inline-block mb-2 text-gray-700"
            >Ingrediente a modificar</label
          >

          <!--input nombre-->
          <i class="fa fa-user fa-fw" />
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
                bind:value={name}
              >
                {#each ingredientes as ingrediente}
                  <option>{ingrediente.nombre}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
        <div class="form-group mb-6">
          <label
            for="nuevoNombre"
            class="form-label inline-block mb-2 text-gray-700"
            >Nuevo nombre ingrediente</label
          >
          <label
            for="NoCambiarNombre"
            class="form-label inline-block mb-1 text-xs text-gray-400"
            >Dejar en blanco si no se quiere cambiar el nombre</label
          >
          <!--input nuevo ingrediente-->
          <input
            type="text"
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
            placeholder="Nuevo nombre ingrediente"
            bind:value={newName}
            required
          />
        </div>
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword2"
            class="form-label inline-block mb-2 text-gray-700">Cantidad</label
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
            placeholder="cantidad"
            min="0"
            bind:value={cantidad}
            required
          />
        </div>
        <!---->
        <div class="text-right mr-10">
          <sl-button slot="footer" variant="success" on:click={() => update()}
            >Modificar ingrediente</sl-button
          >
          <sl-button
            on:click={() => document.querySelector(".dialog-overview").hide()}
            slot="footer"
            variant="danger">Cancelar</sl-button
          >
        </div>
      </form>
    </div>
  </sl-dialog>

  <div class="text-right mr-10">
    <button
      class="bg-blue-500 hover:bg-lime-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-lime-700 rounded
  text-black-400 "
      on:click={() => document.querySelector(".dialog-overview").show()}
    >
      Editar ingredientes
      <i class="fa fa-wrench fa-fw mr-3" />
    </button>
  </div>
{/if}
