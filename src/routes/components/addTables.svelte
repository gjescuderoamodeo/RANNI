<script>
  import { post } from "$lib/utils.js";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let verificar = false;
  let id = "";

  onMount(async () => {
    await verifyUser();
  });

  async function submit(event) {
    verifyUser();
    const request = await post(`/api/addTablesJS`, {
      id,
    });
    //console.log(request.message);

    switch (request.status) {
      case 300:
        alert("mesa creada exitosamente");
        id = "";
        break;
      case 400:
        alert("la mesa ya está en la base de datos");
        break;
    }
  }

  async function verifyUser() {
    const request = await fetch("/auth/verifyUserAdmin").then((r) => r.json());
    if (request.status !== 200) {
      return goto("/");
    } else {
      verificar = true;
    }
  }
</script>

{#if verificar}
  <body class="bg-white">
    <!--Registro mesa-->
    <div
      class="block p-6 rounded-lg shadow-lg bg-sky-200 max-w-sm mx-auto mt-32 "
    >
      <form on:submit|preventDefault={submit}>
        <div class="form-group mb-6">
          <label for="id" class="form-label inline-block mb-2 text-gray-700"
            >ID</label
          >
          <!--input id-->
          <input
            type="text"
            class="form-control
          block
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
            id="id"
            bind:value={id}
            placeholder="Enter id"
            required
          />
        </div>
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
        ease-in-out">Añadir mesa</button
        >
      </form>
    </div>
  </body>
{/if}
