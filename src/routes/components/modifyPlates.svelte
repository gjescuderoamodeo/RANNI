<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  //saco los nombres de los platos
  let platos = [];

  //variables
  let verificar = false;
  let name = "";
  let precio = 1;
  let disponibilidad = "Disponible";
  let newName = "";

  onMount(async () => {
    await verifyUser();
    await reload();
    setInterval(reload, 7000);
  });

  async function reload() {
    const request = await fetch(`/api/platos`);
    platos = await request.json();
  }

  async function verifyUser() {
    const request = await fetch("/auth/verifyUserAdmin").then((r) => r.json());
    if (request.status !== 200) {
      return goto("/");
    } else {
      verificar = true;
    }
  }

  async function update(plato) {
    if (disponibilidad == "Disponible") {
      disponibilidad = true;
    } else {
      disponibilidad = false;
    }

    let put = await fetch(`/api/platos`, {
      body: JSON.stringify({ newName, name, precio, disponibilidad }),
      method: "put",
    });
    if (put.status == 200) {
      alert("plato modificado");
      name = "";
      precio = 1;
      newName = "";
      disponibilidad = "Disponible";
      reload();
    } else {
      alert("error al modificar el plato");
    }
  }
</script>

{#if verificar}
  <sl-dialog class="dialog-overview2 text-left font-bold ">
    <h5 class="tex-xl text-center text-2xl">Editar platos</h5>
    <!-- -->
    <div
      class="block p-6 rounded-lg shadow-lg bg-sky-200 max-w-sm mx-auto mb-20"
    >
      <form>
        <div class="form-group mb-6">
          <label for="nombre" class="form-label inline-block mb-2 text-gray-700"
            >Plato a modificar</label
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
                {#each platos as plato}
                  <option>{plato.nombre}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword2"
            class="form-label inline-block mb-2 text-gray-700"
            >Nuevo nombre plato</label
          ><label
            for="NoCambiarNombre"
            class="form-label inline-block mb-1 text-xs text-gray-400"
            >Dejar en blanco si no se quiere cambiar el nombre</label
          >
          <!--input nuevo plato-->
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
            placeholder="Nuevo nombre plato"
            bind:value={newName}
            required
          />
        </div>
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword2"
            class="form-label inline-block mb-2 text-gray-700">precio</label
          >
          <!--input precio-->
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
            placeholder="precio"
            min="1"
            bind:value={precio}
            required
          />
        </div>
        <label
          for="exampleInputPassword2"
          class="form-label inline-block mb-2 text-gray-700"
          >Disponibilidad</label
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
              bind:value={disponibilidad}
            >
              <option selected>Disponible</option>
              <option>No Disponible</option>
            </select>
          </div>
        </div>
        <!---->
        <div class="text-right mr-10">
          <sl-button slot="footer" variant="success" on:click={() => update()}
            >Modificar plato</sl-button
          >
          <sl-button
            on:click={() => document.querySelector(".dialog-overview2").hide()}
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
      on:click={() => document.querySelector(".dialog-overview2").show()}
    >
      Editar platos
      <i class="fa fa-wrench fa-fw mr-3" />
    </button>
  </div>
{/if}
