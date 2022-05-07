<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let mesas = [];
    let verificar = false;
    let i = 0;

    onMount(async () => {
        await verifyUser();
        await reload();
        setInterval(reload, 6000);
    });

    async function reload() {
        const request = await fetch(`/api/mesas`);
        mesas = await request.json();
    }

    async function verifyUser() {
        const request = await fetch("/auth/verifyUserWaitress").then((r) =>
            r.json()
        );
        if (request.status !== 200) {
            return goto("/");
        } else {
            verificar = true;
        }
    }

    async function update2(mesa) {
        i += 1;
    }

    async function update(mesa) {
        await fetch(`/frutas`, {
            body: JSON.stringify({ ...fruta }),
            method: "put",
        }).then(reload);
    }

    const buscarmesa = (id) => mesasCopia.find((mesa) => mesa.id == id);
</script>

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

<body>
    {#if verificar}
        <div>
            <!--Listado mesas-->

            <!-- component -->
            <script src="https://cdn.tailwindcss.com"></script>
            <link
                rel="stylesheet"
                href="https://cdn.tailgrids.com/tailgrids-fallback.css"
            />
            <script
                defer
                src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

            <!-- ====== Table Section Start -->
            <section class="bg-white py-20 lg:py-[120px]">
                <div class="container">
                    <div class="flex flex-wrap -mx-4">
                        <div class="w-full px-4">
                            <div class="max-w-full overflow-x-auto">
                                <table class="table-auto w-full">
                                    <tbody>
                                        <!--  {#each mesas as mesa}
                                            <tr>
                                                <td
                                                    class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-stone-50
                           border-b border-l border-[#E8E8E8]
                           "
                                                >
                                                    {mesa.id}
                                                    <p />
                                                    <span
                                                        class="text-green-500"
                                                    >
                                                        <i
                                                            class="fas fa-table "
                                                        />
                                                    </span></td
                                                >
                                                {#if par % 2 == 0}
                                                    <td
                                                        class="
                       text-center text-dark
                       font-medium
                       text-base
                       py-5
                       px-2
                       bg-stone-50
                       border-b border-l border-[#E8E8E8]
                       "
                                                    >
                                                        {mesa.id}
                                                        <p />
                                                        <span
                                                            class="text-green-500"
                                                        >
                                                            <i
                                                                class="fas fa-table "
                                                            />
                                                        </span></td
                                                    >
                                                {:else}
                                                    {(par += 1)}
                                                {/if}
                                            </tr>
                                        {/each} -->
                                        {#each mesas as mesa}
                                            <tr>
                                                <td
                                                    class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-stone-50
                           border-b border-l border-[#E8E8E8]
                           "
                                                >
                                                    {mesa.id}
                                                    <p />
                                                    <span
                                                        class="text-green-500"
                                                    >
                                                        <i
                                                            class="fas fa-table "
                                                        />
                                                    </span></td
                                                >
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- ====== Table Section End -->
        </div>
    {/if}
</body>
