<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { post } from "$lib/utils.js";
    //importaciones de otros módulos
    import CrudUsuarios from "./crudUsers.svelte";
    import CrudFood from "./crudFood.svelte";

    onMount(async () => {
        await verifyUser();
        setInterval(numeroUsuarios, 5000);
        setInterval(numeroPlatos, 5000);
    });

    //variables
    let name = ""; //nombre de usuario
    let numberUsers = 0; //número de usuarios
    let numberPlates = 0; //número de platos
    //variables que nos permiten cambiar de pestaña de Administración
    let adminControl = 1;

    async function closeSession() {
        console.log("Sesión cerrada!");

        await fetch("/auth/closeSession", {
            method: "post",
        });

        goto("/");
    }

    function showUser() {
        adminControl = 1;
    }

    function showBill() {
        adminControl = 3;
    }

    function showFood() {
        adminControl = 2;
    }

    //validar que el usuario es administrador
    async function verifyUser() {
        const request = await fetch("/auth/verifyUserAdmin").then((r) =>
            r.json()
        );
        if (request.status !== 200) {
            console.log("Usuario no válido");
            return goto("/");
        } else {
            name = request.name;
            numeroUsuarios();
            numeroPlatos();
        }
    }

    //función que saca el número de usuarios
    async function numeroUsuarios() {
        let numero = await fetch("/api/numberOfUsers").then((r) => r.json());
        numberUsers = numero;
    }

    async function numeroPlatos() {
        let numero = await fetch("/api/numberOfPlates").then((r) => r.json());
        numberPlates = numero;
    }
</script>

<html lang="esp">
    <head>
        <title>Ranni</title>

        <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
            crossorigin="anonymous"
        />
        <link
            rel="stylesheet"
            href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
        <!--Replace with your tailwind.css once created-->
        <script
            src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"
            integrity="sha256-XF29CBwU1MWLaGEnsELogU6Y6rcc5nCkhhx89nFMIDQ="
            crossorigin="anonymous"></script>
    </head>

    <body class="bg-gray-100 font-sans leading-normal tracking-normal">
        <nav id="header" class="bg-white fixed w-full z-10 top-0 shadow">
            <div
                class="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0"
            >
                <div class="w-1/2 pl-2 md:pl-0">
                    <p
                        class="text-2xl fas fa-moon text-Blue-100 pr-3 sm:text-Red-200"
                    >
                        Ranni
                    </p>
                </div>
                <div class="w-1/2 pr-0">
                    <div class="flex relative inline-block float-right ">
                        <div class="relative text-sm ">
                            <button
                                id="userButton"
                                class="flex items-center focus:outline-none mr-3"
                            >
                                <span
                                    class="hidden md:inline-block text-xl font-semibold text-inherit"
                                    >Usuario: <button
                                        class="text-xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                                    >
                                        {name}
                                    </button>
                                </span>
                            </button>
                            <div
                                id="userMenu"
                                class="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto mx-auto z-30 invisible sm:min-w-full"
                            >
                                <ul class="list-reset">
                                    <li>
                                        <button
                                            on:click={closeSession}
                                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center "
                                        >
                                            <svg
                                                class="fill-current w-4 h-4 mr-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                ><path
                                                    d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"
                                                /></svg
                                            >
                                            <span>Cerrar Sesion</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white z-20"
                    id="nav-content"
                >
                    <ul
                        class="list-reset lg:flex flex-1 items-center px-4 md:px-0"
                    >
                        <li class="mr-6 my-2 md:my-0" on:click={showUser}>
                            <p
                                class="block py-1 md:py-3 pl-1 align-middle text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600"
                            >
                                <i
                                    class="fas fa-user fa-fw mr-3 text-pink-600"
                                /><span class="pb-1 md:pb-0 text-sm"
                                    >Administrar usuarios</span
                                >
                            </p>
                        </li>
                        <li class="mr-6 my-2 md:my-0" on:click={showFood}>
                            <p
                                class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-yellow-500"
                            >
                                <i
                                    class="fas fa-utensils fa-fw mr-3 text-yellow-500"
                                /><span class="pb-1 md:pb-0 text-sm"
                                    >Administrar platos y ingredientes</span
                                >
                            </p>
                        </li>
                        <li class="mr-6 my-2 md:my-0" on:click={showBill}>
                            <p
                                class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500"
                            >
                                <i
                                    class="fa fa-file fa-fw mr-3 text-purple-500"
                                /><span class="pb-1 md:pb-0 text-sm"
                                    >Facturas</span
                                >
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!--Container-->
        <div class="container w-full mx-auto pt-20">
            <div
                class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal"
            >
                <!--Console Content-->

                <div class="flex flex-wrap">
                    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                        <!--Metric Card-->
                        <div class="bg-white border rounded shadow p-2">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded p-3 bg-green-600">
                                        <i
                                            class="fa fa-wallet fa-2x fa-fw fa-inverse"
                                        />
                                    </div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h5
                                        class="font-bold uppercase text-gray-500"
                                    >
                                        Total ganancias
                                    </h5>
                                    <h3 class="font-bold text-3xl">
                                        $3249 <span class="text-green-500"
                                            ><i class="fas fa-caret-up" /></span
                                        >
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <!--/Metric Card-->
                    </div>
                    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                        <!--Metric Card-->
                        <div class="bg-white border rounded shadow p-2">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded p-3 bg-pink-600">
                                        <i
                                            class="fas fa-users fa-2x fa-fw fa-inverse"
                                        />
                                    </div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h5
                                        class="font-bold uppercase text-gray-500"
                                    >
                                        Usuarios totales
                                    </h5>
                                    <h3 class="font-bold text-3xl">
                                        {numberUsers}
                                        <span class="text-pink-500"
                                            ><i
                                                class="fas fa-exchange-alt"
                                            /></span
                                        >
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <!--/Metric Card-->
                    </div>
                    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                        <!--Metric Card-->
                        <div class="bg-white border rounded shadow p-2">
                            <div class="flex flex-row items-center">
                                <div class="flex-shrink pr-4">
                                    <div class="rounded p-3 bg-blue-600">
                                        <i
                                            class="fas fa-utensils fa-2x fa-fw fa-inverse"
                                        />
                                    </div>
                                </div>
                                <div class="flex-1 text-right md:text-center">
                                    <h5
                                        class="font-bold uppercase text-gray-500"
                                    >
                                        Platos totales
                                    </h5>
                                    <h3 class="font-bold text-3xl">
                                        {numberPlates} platos
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <!--/Metric Card-->
                    </div>
                </div>

                <!--Divider-->
                <hr class="border-b-2 border-gray-200 my-8 mx-4" />
                <!--MÓDULO DE LOS USUARIOS-->
                {#if adminControl == 1}
                    <CrudUsuarios />
                {/if}
                <!--MÓDULO DE LOS PLATOS E INGREDIENTES-->
                {#if adminControl == 2}
                    <CrudFood />
                {/if}
                <!--/ Console Content-->
            </div>
        </div>

        <script>
            /*Toggle dropdown list*/
            /*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/

            var userMenuDiv = document.getElementById("userMenu");
            var userMenu = document.getElementById("userButton");

            var navMenuDiv = document.getElementById("nav-content");
            var navMenu = document.getElementById("nav-toggle");

            document.onclick = check;

            function check(e) {
                var target = (e && e.target) || (event && event.srcElement);

                //User Menu
                if (!checkParent(target, userMenuDiv)) {
                    // click NOT on the menu
                    if (checkParent(target, userMenu)) {
                        // click on the link
                        if (userMenuDiv.classList.contains("invisible")) {
                            userMenuDiv.classList.remove("invisible");
                        } else {
                            userMenuDiv.classList.add("invisible");
                        }
                    } else {
                        // click both outside link and outside menu, hide menu
                        userMenuDiv.classList.add("invisible");
                    }
                }

                //Nav Menu
                if (!checkParent(target, navMenuDiv)) {
                    // click NOT on the menu
                    if (checkParent(target, navMenu)) {
                        // click on the link
                        if (navMenuDiv.classList.contains("hidden")) {
                            navMenuDiv.classList.remove("hidden");
                        } else {
                            navMenuDiv.classList.add("hidden");
                        }
                    } else {
                        // click both outside link and outside menu, hide menu
                        navMenuDiv.classList.add("hidden");
                    }
                }
            }

            function checkParent(t, elm) {
                while (t.parentNode) {
                    if (t == elm) {
                        return true;
                    }
                    t = t.parentNode;
                }
                return false;
            }
        </script>
    </body>
</html>
