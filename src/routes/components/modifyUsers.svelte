<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  //saco los nombres de los usuarios
  let usuarios = [];

  //variables
  let verificar = false;
  let name = "";
  let password = "";
  let job = "Camarero";
  let newName = "";
  let errors = false;

  onMount(async () => {
    await verifyUser();
    await reload();
    setInterval(reload, 7000);
  });

  async function reload() {
    const request = await fetch(`/api/usuarios`);
    usuarios = await request.json();
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
    if (name != "" && newName != "" && password != "") {
      let put = await fetch(`/api/usuarios`, {
        body: JSON.stringify({ newName, name, password, job }),
        method: "put",
      });
      if (put.status == 200) {
        alert("usuario modificado");
        name = "";
        password = "";
        job = "Camarero";
        newName = "";
        reload();
      } else {
        alert("error al modificar el usuario");
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
  <sl-dialog class="dialog-overview text-left font-bold ">
    <h5 class="tex-xl text-center text-2xl">Editar Usuarios</h5>
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
            >Usuario a modificar</label
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
                required
              >
                {#each usuarios as usuario}
                  <option>{usuario.nombre}</option>
                {/each}
              </select>
            </div>
          </div>
        </div>
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword2"
            class="form-label inline-block mb-2 text-gray-700"
            >Nuevo nombre usuario</label
          >
          <!--input nuevo usuario-->
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
            placeholder="Nuevo nombre usuario"
            bind:value={newName}
            required
          />
        </div>
        <div class="form-group mb-6">
          <label
            for="exampleInputPassword2"
            class="form-label inline-block mb-2 text-gray-700">Contraseña</label
          >
          <!--input contraseña-->
          <i class="fa fa-key fa-fw" />
          <input
            type="password"
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
            placeholder="Password"
            bind:value={password}
            required
          />
        </div>
        <!--Input para la lista desplegable del tipo de trabajo a seleccionar-->

        <div class="form-group mb-6">
          <label
            for="puestolaboral"
            class="form-label inline-block mb-2 text-gray-700"
            >Puesto Laboral</label
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
                bind:value={job}
              >
                <option selected>Camarero</option>
                <option>Cocinero</option>
                <option>Administrador</option>
              </select>
            </div>
          </div>
        </div>
        <!---->
        <div class="text-right mr-10">
          <sl-button slot="footer" variant="success" on:click={() => update()}
            >Modificar usuario</sl-button
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
      Editar Usuarios
      <i class="fa fa-wrench fa-fw mr-3" />
    </button>
  </div>
{/if}
