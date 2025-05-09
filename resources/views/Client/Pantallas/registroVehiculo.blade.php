<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registrar Vehiculo</title>

        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
        <h1 class="titulo"><img src="assets/Client/RegistrarVehiculo.svg">  Registrar Transporte</h1>
        <form action="{{ route('storeVehiculo') }}" method="post">
            @csrf

            <div class="container">
                <div class="div div1">
                    <h2 class="num">1</h2>
                    <h2>Datos</h2>
                    <div class="movile">
                        <p>Nombre</p>
                        <input type="text" name="nombre">
                    </div>

                    <div class="movile">
                        <p>Seleccionar tipo</p>
                        <select class="hora" name="tipo">
                            <option>Buque</option>
                            <option>Trailer</option>
                        </select>
                    </div>
                </div>

                <div class="div div2">
                    <h2 class="num">2</h2>
                    <h2>Datos de la empresa</h2>
                    <div class="movile">
                        <p>Empresa</p>
                        <input type="text" name="empresa" value="{{ $empresa -> nombre }}" readonly>
                        <input type="text" name="id_empresa" value="{{ $empresa -> id }}" hidden>
                    </div>
                </div>
            </div>

            <button class="crear btn">Registrar</button>
        </form>
        <form action="" method="get">
            <button class="cancelar btn">Cancelar</button>
        </form>
    </body>
</html>

<style>
    html, body {
        margin: 0;
        padding: 3% 0px;
        overflow: hidden;
        max-width: 100vw;
        box-sizing: border-box;
    }
    h1 {
        font-size: 1.8rem;
        margin-left: 6%;
    }
    h1 img {
        filter: brightness(0) invert(0);
    }

    h2 {
        color: var(--Cinder-950, #040813);

        font-weight: bold;
        font-size: 1.5rem;
        margin-left: 5%;
    }

    p {
        font-size: 1.2rem;

        margin-bottom: 2px;
    }
    .num {
        color: var(--Cinder-900, #152D65);
        background-image: url("assets/elipse.svg");
        background-size: contain;
        background-position: left;
        background-repeat: no-repeat;

        font-size: 1.8rem;
        font-weight: bolder;

        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        display: flex;
        position: relative;
        right: 13%;
        bottom: -38px;
    }

    .titulo {
        width: 100%;

        font-weight: bold;

        display: flex;
        align-items: start;
    }
    .titulo img {
        width: 10%;

        margin-right: 3%;
    }

    select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: url('assets/flecha.svg') no-repeat calc(100% - 3%) var(--Cinder-100, #E3E9FB) !important;

        border: none;

        font-size: 1.2rem;

        display: flex;
        width: 100%;
        height: 2rem;
        padding-left: 2%;
        justify-content: flex-end;
        align-items: center;
        flex-shrink: 0;
    }

    input {
        background: var(--Cinder-100, #E3E9FB);

        border: none;

        font-size: 1.2rem;

        display: inline-block;
        padding: 0% 2%;
        width: 100%;
        height: 2rem;
        align-items: center;
    }
    input:readonly {
        background: var(--Cinder-50, #F1F5FE);
    }

    .container {
        display: flex;
        justify-content: center;  /* Centra horizontalmente */
        align-items: center;
    }
    .div {
        width: 90%;
        max-width: 100%;
        margin-left: 10%;
        position: absolute;
    }
    .div1 {
        top: 10%;
    }
    .div2 {
        top: 45%;
    }

    .movile {
        position: relative;

        margin: 15px 0px;
        right: 8%;
    }

    .btn {
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        border-radius: 4px;
        border: 2px solid var(--Cinder-900, #152D65);
        box-shadow: 3px 4px 4px 0px rgba(0, 0, 0, 0.25);

        width: 40%;
        height: 5%;
        padding: 10px 0px;
        justify-content: center;
        align-items: center;

        position: absolute;
        bottom: 19%;
    }
    .crear {
        color: var(--Cinder-50, #F1F5FE);

        background: var(--Cinder-900, #152D65);

        display: flex;

        right: 6%;
    }
    .cancelar {
        color: var(--Cinder-800, #133379);

        border-radius: 4px;
        border: 2px solid var(--Cinder-900, #152D65);
        background: var(--Amarillo, #E59506);
        box-shadow: 3px 4px 4px 0px rgba(0, 0, 0, 0.25);

        display: inline-flex;

        left: 6%;
    }
</style>
