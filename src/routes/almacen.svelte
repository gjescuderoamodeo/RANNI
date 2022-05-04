<script>
    import { goto } from "$app/navigation";
    //importaciones de otros módulos
    import CrudUsuarios from "./crudUsers.svelte";

    async function closeSession() {
        console.log("Sesión cerrada!");

        await fetch("/auth/closeSession", {
            method: "post",
        });

        goto("/");
    }

    //validar que el usuario es administrador
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
                    <p class="text-2xl fas fa-moon text-Blue-600 pr-3">Ranni</p>
                </div>
                <div class="w-1/2 pr-0">
                    <div class="flex relative inline-block float-right">
                        <div class="relative text-sm">
                            <button
                                id="userButton"
                                class="flex items-center focus:outline-none mr-3"
                            >
                                <span class="hidden md:inline-block"
                                    >Hi, User
                                </span>
                            </button>
                            <div
                                id="userMenu"
                                class="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible"
                            >
                                <ul class="list-reset">
                                    <li>
                                        <p
                                            on:click={closeSession}
                                            class="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline"
                                        >
                                            Cerrar Sesion
                                        </p>
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
                        <li class="mr-6 my-2 md:my-0">
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
                        <li class="mr-6 my-2 md:my-0">
                            <p
                                class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-pink-500"
                            >
                                <i class="fas fa-utensils fa-fw mr-3" /><span
                                    class="pb-1 md:pb-0 text-sm"
                                    >Administrar platos y ingredientes</span
                                >
                            </p>
                        </li>
                        <li class="mr-6 my-2 md:my-0">
                            <p
                                class="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500"
                            >
                                <i class="fa fa-file fa-fw mr-3" /><span
                                    class="pb-1 md:pb-0 text-sm">Facturas</span
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
                                        249 <span class="text-pink-500"
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
                                        12 platos
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <!--/Metric Card-->
                    </div>
                </div>

                <!--Divider-->
                <hr class="border-b-2 border-gray-400 my-8 mx-4" />
                <!--MÓDULO DE LOS USUARIOS-->
                <CrudUsuarios />
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
