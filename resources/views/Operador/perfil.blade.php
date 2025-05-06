<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/perfil.css') }}">
</head>

<body>

    <div class="d-flex flex-column vh-100 col-9 col-xl-9 col-lg-9 col-md-9" id="cuerpo">

        <div class="d-flex flex-row" id="titulo">
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="55" viewBox="0 0 56 55" fill="none">
              <path d="M11.25 15.3126C11.25 11.362 12.8194 7.57315 15.6129 4.77964C18.4064 1.98613 22.1952 0.416748 26.1459 0.416748C30.0965 0.416748 33.8853 1.98613 36.6788 4.77964C39.4723 7.57315 41.0417 11.362 41.0417 15.3126C41.0417 19.2632 39.4723 23.052 36.6788 25.8455C33.8853 28.639 30.0965 30.2084 26.1459 30.2084C22.1952 30.2084 18.4064 28.639 15.6129 25.8455C12.8194 23.052 11.25 19.2632 11.25 15.3126ZM26.8229 54.5834H0.416687V49.1668C0.416687 44.857 2.12874 40.7237 5.1762 37.6763C8.22367 34.6288 12.3569 32.9168 16.6667 32.9167H26.8229V54.5834ZM32.2396 32.9167H55.2604V38.3334H32.2396V32.9167ZM32.2396 41.0418H55.2604V46.4584H32.2396V41.0418ZM32.2396 49.1668H55.2604V54.5834H32.2396V49.1668Z" fill="black"/>
            </svg>
            <h2>Mi perfil</h2>
          </div>

          <div class="d-flex flex-column align-items-center" id="body-perfil">

            <img src="{{ asset('assets/pruebaPerfilMenu.png') }}" alt="foto-perfil">

                <form>

                <div class="d-flex flex-row" id="info-perfil">

                    <div class="d-flex flex-column" id="input-perfil">

                        <label>Nombre</label>
                        <input type="text" class="form-control" value="{{ $usuario->name }}">

                    </div>

                    <div class="d-flex flex-column" id="input-perfil">

                        <label>Usuario</label>
                        <input type="text" class="form-control" value="{{ $usuario->usuario }}">

                    </div>

                    <div class="d-flex flex-column" id="input-perfil">

                        <label>Teléfono</label>
                        <input type="text" class="form-control" value="{{ $usuario->telefono }}">

                    </div>

                    <div class="d-flex flex-column" id="input-perfil">

                        <label>Ciudad</label>
                        <input type="text" class="form-control" value="{{ $usuario->ciudad }}">

                    </div>

                    <div class="d-flex flex-column" id="input-perfil">

                        <label>Código postal</label>
                        <input type="text" class="form-control" value="{{ $usuario->codigoPostal }}">

                    </div>

                    <div class="d-flex flex-column" id="input-perfil">

                        <label>Email</label>
                        <input type="text" class="form-control" value="{{ $usuario->email }}">

                    </div>

                </div>
            </div>
            <div class="d-flex" id="boton-container">
                <form action="{{ route('logout') }}" method="post">
                    @csrf
                    <button type="submit" id="boton-perfil" class="btn btn-danger">Cerrar sesión</button>
                </form>
            </div>
            </form>
    </div>

</body>
</html>


