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
        <form action="{{ route('registrar_P3') }}" method="post">
            @csrf

            <div class="container">
                <div class="div div1">
                    <h2 class="num">2</h2>
                    <h2>Password</h2>
                    <div class="movile">
                        <p>Contraseña</p>
                        <input type="password" id="pass" name="password" value="{{ session('registro_datos2') ? session('registro_datos2.password') : '' }}" required>
                        <input type="password" id="pass2" name="repeat_password" value="{{ session('registro_datos2') ? session('registro_datos2.repeat_password') : '' }}" required>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="div div2">
                    <h2 class="num">3</h2>
                    <h2>Datos de empresa</h2>
                    <div class="movile">
                        <p>Nombre</p>
                        <input type="text" name="nombre_empresa" value="{{ session('registro_datos2') ? session('registro_datos2.nombre_empresa') : '' }}" required>
                    </div>

                    <div class="movile">
                        <p>Ciudad y codigo postal</p>
                        @if (session('registro_datos.autonomo'))
                            <input type="text" name="ciudad_empresa" value="{{ session('registro_datos.ciudad') }}" readonly required>
                            <input type="text" name="codigo_postal_empresa" value="{{ session('registro_datos.codigo_postal') }}" readonly required>
                        @elseif (session('registro_datos2.ciudad_empresa') && session('registro_datos2.codigo_postal_empresa'))
                            <input type="text" name="ciudad_empresa" value="{{ session('registro_datos2.ciudad_empresa') }}" readonly required>
                            <input type="text" name="codigo_postal_empresa" value="{{ session('registro_datos2.codigo_postal_empresa') }}" readonly required>
                        @else
                            <input type="text" name="ciudad_empresa" required>
                            <input type="text" name="codigo_postal_empresa" required>
                        @endif
                    </div>

                    <div class="movile">
                        <p>CIF</p>
                        <input type="text" name="cif" value="{{ session('registro_datos2.cif') }}" required>
                    </div>

                    <div class="movile">
                        <p>Email</p>
                        <input type="text" name="email_empresa" value="{{ session('registro_datos2.email_empresa') }}" required>
                    </div>
                </div>
            </div>

            <button class="crear btn">Siguiente</button>
        </form>
        <form action="{{ route('registrar_P1') }}" method="get">
            <button class="cancelar btn">Volver</button>
        </form>
    </body>
</html>

<script>
    window.addEventListener('load', inicio);

    function inicio() {
        const pass1 = document.getElementById('pass').addEventListener('input', validarPassword, false);
        const pass2 = document.getElementById('pass2').addEventListener('input', validarPassword, false);
    }

    function validarPassword() {
        const pass1 = document.getElementById('pass');
        const pass2 = document.getElementById('pass2');

        const test = /^[0-9]{4}$/.test(pass1.value);

        if (test) {
            pass1.setCustomValidity("");
            if (pass1.value !== pass2.value) {
                pass2.setCustomValidity("Las passwords deben coincidir.");
                return false;
            } else {
                pass2.setCustomValidity("");
                return true;
            }
        } else {
            pass1.setCustomValidity("Las password debe ser de 4 digitos.");
            return false;
        }

        return false;
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

    input {
        background: var(--Cinder-100, #E3E9FB);

        border: none;

        font-size: 1.2rem;

        display: inline-block;
        margin: 3px 0px;
        padding: 0% 2%;
        width: 100%;
        height: 2rem;
        align-items: center;
    }
    input:readonly {
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
    .div2 {
        top: 32%;
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
