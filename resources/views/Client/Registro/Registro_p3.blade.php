<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registrar Usuario</title>

        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
        <h1 class="titulo"><img src="assets/Gestor/UsuariosCrear.svg">  Registro</h1>
        <form action="{{ route('registroFinal') }}" method="post" enctype="multipart/form-data">
            @csrf

            <div class="container">
                <div class="div div1">
                    <h2 class="num">4</h2>
                    <h2>Documentacion</h2>
                    <div class="movile">
                        <input type="file" accept="application/pdf" id="file1" name="document" style="display: none;" onchange="updateFileName()" required>

                        <label class="subirArchivo btn" for="file1">Subir Documentación</label>

                        <div class="files">
                            <p id="file-name">Ningún archivo PDF seleccionado.</p>
                        </div>
                    </div>
                </div>
            </div>

            <button class="crear boton btn">Siguiente</button>
        </form>
        <form action="{{ route('registrar_P2b') }}" method="get">
            <button class="cancelar boton btn">Volver</button>
        </form>
    </body>
</html>

<script>

    function updateFileName() {
        const fileInput = document.getElementById('file1');
        const fileName = document.getElementById('file-name');

        if (fileInput.files.length > 0) {
            fileName.textContent = fileInput.files[0].name;
        } else {
            fileName.textContent = 'Ningún archivo seleccionado.';
        }
    }
</script>

<style>
    html, body {
        margin: 0;
        padding: 3% 0px;
        overflow: hidden;
        max-width: 100vw;
        box-sizing: border-box;
    }
    h1 {
        font-size: 2rem;
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

    p, label {
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

    .files {
        background: var(--Cinder-100, #E3E9FB);
        border: solid 1px #1448B5;

        height: 400px;
        padding: 3px 6px;
    }
    input {
        border: none;

        font-size: 1.2rem;

        display: inline-block;
        margin: 3px 0px;
        padding: 0% 2%;
        width: 100%;
        height: 2rem;
        align-items: center;
    }
    input[type='file'] {
        content: 'Subir documentacion';
        background: var(--Cinder-50, #F1F5FE);
    }

    label {
        display: flex;
        align-items: center;
        gap: 10px;
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
        top: 8%;
    }

    .movile {
        position: relative;

        margin: 15px 0px;
        right: 5%;
    }
    .subirArchivo {
        color: var(--Cinder-50, #F1F5FE);
        background: var(--Cinder-900, #152D65);

        font-size: 1.3rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        width: 78%;
        height: 50px;

        border-radius: 12px;

        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px auto;
    }

    .boton {
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
        bottom:3%;
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
