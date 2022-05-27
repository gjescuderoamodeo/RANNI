<script>
    import { post } from "$lib/utils.js";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let name = "";
    let password = "";
    let job = "Administrador";

    onMount(async () => {
        checkNoUsers();
    });

    async function checkNoUsers() {
        let request2 = await post(`/api/checkNoUsersJS`);

        switch (request2.status) {
            case 403:
                return goto("/");
            case 400:
                return goto("/");
        }
    }

    async function submit(event) {
        if (job != "" && password != "" && job != "") {
            const request = await post(`/api/addUsersJS`, {
                name,
                password,
                job,
            });
            //console.log(request.message);

            switch (request.status) {
                case 300:
                    alert("Usuario creado exitosamente");
                    name = "";
                    password = "";
                    return goto("/");
                case 400:
                    alert("El usuario ya está en la base de datos");
                    break;
            }
        }
    }
</script>

<body class="bg-white">
    <!--Registro usuario-->
    <div
        class="block p-6 rounded-lg shadow-lg bg-sky-200 max-w-sm mx-auto mt-32 "
    >
        <form on:submit|preventDefault={submit}>
            <div class="form-group mb-6">
                <label
                    for="nombre"
                    class="form-label inline-block mb-2 text-gray-700"
                    >Nombre</label
                >
                <!--input nombre-->
                <i class="fa fa-user fa-fw" />
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
                    id="name"
                    bind:value={name}
                    placeholder="Enter name"
                    required
                />
            </div>
            <div class="form-group mb-6">
                <label
                    for="exampleInputPassword2"
                    class="form-label inline-block mb-2 text-gray-700"
                    >Contraseña</label
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
                    bind:value={password}
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
          hover:bg-green-700 hover:shadow-lg
          focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-green-800 active:shadow-lg
          transition
          duration-150
          ease-in-out">Añadir usuario</button
            >
        </form>
    </div>
</body>
