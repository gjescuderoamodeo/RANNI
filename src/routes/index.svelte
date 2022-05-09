<script>
    import { goto } from "$app/navigation";
    import { post } from "$lib/utils.js";

    let name = "";
    let password = "";
    let errors = false;

    async function submit(event) {
        closeSession();
        const request = await post(`auth/login`, { name, password });

        switch (request.status) {
            case 301: //cocinero
                return goto("/cocina");
            case 302: //camarero
                return goto("/camarero");
            case 303: //admin
                return goto("/almacen");
            case 401:
                errors = true;
        }
    }

    //cierro la sesión por si hay otro jwt
    async function closeSession() {
        console.log("Sesión cerrada!");

        await fetch("/auth/closeSession", {
            method: "post",
        });

        goto("/");
    }
</script>

<body class="bg-stone-100">
    {#if errors}
        <p>Contraseña o Usuario erroneos</p>
    {/if}

    <img
        src="/RanniLogo.png"
        class="max-w-full h-auto mx-auto mt-10"
        alt="Logo Ranni"
    />

    <!--Registro usuario-->
    <div
        class="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto mt-32 bg-sky-200 mb-20 mt-1"
    >
        <form on:submit|preventDefault={submit}>
            <div class="form-group mb-6 ">
                <label
                    for="nombre"
                    class="form-label inline-block mb-2 text-gray-700 font-bold text-lg"
                    >Nombre</label
                >
                <!--input nombre-->
                <input
                    type="text"
                    class="form-control
          block
          w-full
          px-4
          py-2
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
                    id="name"
                    bind:value={name}
                    placeholder="Enter name"
                    required
                />
            </div>
            <div class="form-group mb-6">
                <label
                    for="exampleInputPassword2"
                    class="form-label inline-block mb-2 text-gray-700 font-bold text-lg"
                    >Contraseña</label
                >
                <!--input contraseña-->
                <input
                    type="password"
                    bind:value={password}
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
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg
        transition
        duration-150
        ease-in-out font-semibold">ingresar</button
            >
        </form>
    </div>
</body>

<style>
    :root {
        @apply bg-stone-100;
    }
</style>
