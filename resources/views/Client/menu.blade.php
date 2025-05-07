<div class="menu-container">
    <div class="menu-item">
        <img src="assets/Client/Citas.png" alt="Ver citas">
        <p>Ver citas</p>
    </div>
    <div class="menu-item">
        <img src="assets/Administrativo/crearTurno.svg" alt="Pedir citas">
        <p>Pedir citas</p>
    </div>
    <div class="menu-item">
        <img src="assets/Client/Perfil.png" alt="Perfil">
        <p>Perfil</p>
    </div>
</div>

<link rel="preconnect" href="https://fonts.bunny.net">
<link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<style>
    .menu-container {
        background-color: #133379;

        display: flex;
        justify-content: space-around;
        align-items: center;

        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        height: 10%;

        padding: 10px 0;
    }

    .menu-item {
        color: white;

        display: flex;
        flex-direction: column;
        align-items: center;

        text-align: center;
    }

    .menu-item img {
        height: 100px;
        margin-bottom: 5px;
    }

    .menu-item p {
        margin: 0;
        font-size: 2rem;
    }
</style>
