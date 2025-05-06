<x-app-layout>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Crear orden</title>
            <link rel="stylesheet" href="{{ asset('css/crearGrua.css') }}">
            <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

        </head>

        <body>

            <h1 id="titulo"><img src="assets/Administrativo/crearOrdenVer.svg">  Crear Grúa</h1>

            <div id="cuerpo">

                <form method="POST" action="{{route('guardarGrua')}}">
                @csrf

                    <div class="div1 d-flex flex-column">

                        <h2 id="subtitulo"> <span>1</span> Datos</h2>

                        <label for="">Nombre</label>
                        <input name="nombre" id="nombre" type="text">

                        <label for="">Marca</label>
                        <input name="marca" id="marca" type="text">

                        <label for="">Modelo</label>
                        <input name="modelo" type="text">

                        <label for="">Capacidad de carga (tn)</label>
                        <input name="capacidad_carga" id="capacidad_carga" type="number" required>

                    </div>

                    <div class="div2 d-flex flex-column">

                        <h2 id="subtitulo"> <span>2</span> Tipo</h2>

                        <label>Selecciona</label>
                        <select name="tipo">

                            <option value=""></option>
                            <option value="SC">SC</option>
                            <option value="STS">STS</option>

                        </select>

                    </div>

                    <div class="div3 d-flex flex-column">

                        <h2 id="subtitulo"> <span>3</span> Zona</h2>

                        <label>Selecciona</label>
                        <select name="zona_grua">

                            <option value=""></option>

                            @foreach($zonas as $zona)

                                <option value="{{$zona->id}}">{{$zona->ubicacion}}</option>

                            @endforeach

                        </select>

                    </div>

                    <button id="boton_crear" type="submit">Crear grúa</button>

                </form>

            </div>

            <form action="" method="get">
                <button class="btn" id="cancelar">Cancelar</button>
            </form>
        </body>
    </html>
</x-app-layout>
