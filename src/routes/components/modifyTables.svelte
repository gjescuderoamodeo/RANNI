<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  //saco los nombres de los mesas
  let mesas = [];

  //variables
  let verificar = false;
  let id = "";
  let newid = "";
  let errors = false;

  onMount(async () => {
    await verifyUser();
    await reload();
    setInterval(reload, 7000);
  });

  async function reload() {
    const request = await fetch(`/api/mesas`);
    mesas = await request.json();
  }

  async function verifyUser() {
    const request = await fetch("/auth/verifyUserAdmin").then((r) => r.json());
    if (request.status !== 200) {
      return goto("/");
    } else {
      verificar = true;
    }
  }

  async function update(mesa) {
    if (newid != "" && id != "") {
      let put = await fetch(`/api/mesas`, {
        body: JSON.stringify({ newid, id }),
        method: "put",
      });
      if (put.status == 200) {
        alert("mesa modificado");
        id = "";
        password = "";
        job = "Camarero";
        newid = "";
        reload();
      } else {
        alert("error al modificar el mesa");
      }
    } else {
      errors = true;
      setTimeout(function () {
        errors = false;
      }, 7000);
    }
  }
</script>

{#if verificar}
  <sl-dialog class="dialog-overview4 text-left font-bold ">
    <h5 class="tex-xl text-center text-2xl">Editar mesas</h5>
    <!-- -->
    <div
      class="block p-6 rounded-lg shadow-lg bg-sky-200 max-w-sm mx-auto mb-20"
    >
      <form>
        {#if errors}
          <p class="text-red-900 font-extrabold">
            No se han introducido bien los datos
          </p>
        {/if}
        <div class="form-group mb-6">
          <label for="nombre" class="form-label inline-block mb-2 text-gray-700"
            >mesa a modificar</label
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
                bind:value={id}
              >
                {#each mesas as mesa}
                  <option>{mesa.id}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword2"
            class="form-label inline-block mb-2 text-gray-700"
            >Nuevo id mesa</label
          >
          <!--input nuevo mesa-->
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
            placeholder="Nuevo nombre mesa"
            bind:value={newid}
            required
          />
        </div>
        <div class="text-right mr-10">
          <sl-button slot="footer" variant="success" on:click={() => update()}
            >Modificar mesa</sl-button
          >
          <sl-button
            on:click={() => document.querySelector(".dialog-overview4").hide()}
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
      on:click={() => document.querySelector(".dialog-overview4").show()}
    >
      Editar mesas
      <i class="fa fa-wrench fa-fw mr-3" />
    </button>
  </div>
{/if}
