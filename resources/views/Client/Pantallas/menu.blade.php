<div class="menu-cliente-container">
    <x-nav-link :href="route('pedirCitas')" :active="request()->routeIs('pedirCitas')">
        <div class="menu-cliente-item" id="pedirCitas">
            <img src="assets/Client/Citas.png" alt="Ver citas">
            <p>Pedir citas</p>
        </div>
    </x-nav-link>
    <div class="menu-cliente-item" id="registrarVehiculo">
        <img src="assets/Client/RegistrarVehiculo.svg" alt="RegistrarVehiculo">
        <p>Transporte</p>
    </div>
    <div class="menu-cliente-item">
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" style="border: none; background: none; padding: 0;">
                <img src="assets/Client/Perfil.png" alt="Perfil">
                <p>Perfil</p>
            </button>
        </form>
    </div>
</div>

<script>
    window.onload = function() {
        const thisPage = window.location.pathname.split('/').pop();

        const menuItems = document.querySelectorAll('.menu-cliente-item');

        menuItems.forEach(item => {
            const itemId = item.id;

            if (thisPage === itemId) {
                item.classList.add('selected');
            }
        });
    }
</script>

<style>
    /* Estilo adicional para evitar que el menú sobresalga del viewport */
    .menu-cliente-container {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
    }

    .menu-cliente-container {
        background-color: #133379;
        display: flex;
        justify-content: space-around;
        align-items: center;

        margin: 0px;

        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        padding-top: 15px;

        z-index: 20;
    }

    .menu-cliente-item {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .menu-cliente-item img {
        height: 40px;
        margin-bottom: 5px;
    }

    button {
        color: white;
    }
    .menu-cliente-item p, .menu-cliente-item a p {
        font-size: 1rem; /* Ajusta el tamaño de la fuente */
        text-align: center;
        word-wrap: break-word; /* Permite que el texto largo se divida en varias líneas */
        white-space: normal; /* Permite que el texto fluya en varias líneas */
        margin: 0;
    }

    .menu-cliente-item:not(.selected) {
        background-color: #133379;
    }

    .menu-cliente-item.selected {
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;

        padding: 10px;
        background-color: #F1F5FE;
    }
    .menu-cliente-item.selected p {
        color: black;
    }
    .menu-cliente-item.selected img {
        filter: brightness(0) invert(0);
    }
</style>
