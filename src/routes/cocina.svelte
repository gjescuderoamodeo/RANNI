<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    //importaciones de otros módulos
    import Listorders from "./components/listOrdersCook.svelte";

    onMount(async () => {
        await verifyUser();
    });

    //variables
    let name = ""; //nombre de usuario

    async function closeSession() {
        console.log("Sesión cerrada!");

        await fetch("/auth/closeSession", {
            method: "post",
        });

        goto("/");
    }

    //validar que el usuario es camarero
    async function verifyUser() {
        const request = await fetch("/auth/verifyUserCook").then((r) =>
            r.json()
        );
        if (request.status !== 200) {
            console.log("Usuario no válido");
            return goto("/");
        } else {
            name = request.name;
        }
    }
</script>

<head>
    <title>Ranni</title>

    <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
        integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
        crossorigin="anonymous"
    />
</head>

<body class="bg-gray-100 font-sans leading-normal tracking-normal">
    <nav id="header" class="bg-white fixed w-full z-10 top-0 shadow">
        <div
            class="w-full container mx-auto flex flex-wrap items-center mt-0 mb-8 pt-3 pb-3 md:pb-0"
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
                            <span
                                class="hidden md:inline-block text-xl font-semibold text-inherit"
                                >Usuario: <button
                                    class="text-xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                >
                                    {name}
                                </button>
                            </span>
                        </button>
                        <div
                            id="userMenu"
                            class="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible"
                        >
                            <ul class="list-reset">
                                <li>
                                    <button
                                        on:click={closeSession}
                                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
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
        </div>
    </nav>

    <!--Container-->
    <div class="container w-full mx-auto pt-20">
        <div
            class="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal"
        >
            <!--MÓDULO DE LISTADO DE PEDIDOS-->
            <Listorders />
        </div>
    </div>
    <!--/ Console Content-->

    <script>
        var userMenuDiv = document.getElementById("userMenu");
        var userMenu = document.getElementById("userButton");

        //var navMenuDiv = document.getElementById("nav-content");
        //var navMenu = document.getElementById("nav-toggle");

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
