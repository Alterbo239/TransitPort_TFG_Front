<x-app-layout>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Crear orden</title>

            <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

            <style>
                h1 {
                    margin-top: 1%;
                    margin-left: 8%;
                }
                h2 {
                    color: var(--Cinder-950, #040813);

                    font-weight: bold;
                }
                p {
                    margin-top: 3%;
                    margin-bottom: 2px;
                }
                .num {
                    color: var(--Cinder-900, #152D65);
                    background-image: url("assets/elipse.svg");
                    background-size: contain;
                    background-position: left;
                    background-repeat: no-repeat;

                    width: 40px;
                    display: flex;
                    justify-content: center;

                    display: flex;
                    position: relative;
                    right: 10%;
                    bottom: -45px;
                }
                .titulo {
                    width: 290px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                select {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    background: url('assets/flecha.svg') no-repeat calc(100% - 3%) var(--Cinder-100, #E3E9FB) !important;

                    border: none;

                    font-size: 1.2rem;

                    display: flex;
                    width: 457px;
                    height: 49px;
                    padding-left: 2%;
                    justify-content: flex-end;
                    align-items: center;
                    flex-shrink: 0;
                }

                .div1 {
                    position: absolute;
                    left: 12%;
                    top: 10%;
                }
                .div2 {
                    position: absolute;
                    left: 12%;
                    top: 40%;
                }
                .div3 {
                    position: absolute;
                    left: 52%;
                    top: 10%;
                }

                .crear {
                    color: var(--Cinder-50, #F1F5FE);

                    font-size: 32px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;

                    border-radius: 4px;
                    border: 2px solid var(--Cinder-900, #152D65);
                    background: var(--Cinder-900, #152D65);
                    box-shadow: 3px 4px 4px 0px rgba(0, 0, 0, 0.25);

                    display: flex;
                    width: 498px;
                    padding: 10px 0px;
                    justify-content: center;
                    align-items: center;

                    position: absolute;
                    right: 22%;
                    bottom: 5%;
                }
                .cancelar {
                    color: var(--Cinder-800, #133379);

                    font-size: 32px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;

                    border-radius: 4px;
                    border: 2px solid var(--Cinder-900, #152D65);
                    background: var(--Amarillo, #E59506);
                    box-shadow: 3px 4px 4px 0px rgba(0, 0, 0, 0.25);

                    display: inline-flex;
                    width: 15%;
                    padding: 10px 0px;
                    justify-content: center;
                    align-items: center;

                    position: absolute;
                    right: 5%;
                    bottom: 5%;
                }
            </style>
        </head>

        <body>
            <h1 class="titulo"><img src="assets/Administrativo/crearOrdenVer.svg">  Crear Orden</h1>
            <form action="{{ route('guardarOrden') }}" method="post">
                @csrf

                <div class="div1">
                    <h2 class="num">1</h2>
                    <h2>Categoría</h2>
                    <p>Tipo de acción</p>
                    <select name="tipo">
                        <option value="carga">Carga</option>
                        <option value="descarga">Descarga</option>
                    </select>
                </div>

                <div class="div2">
                    <h2 class="num">2</h2>
                    <h2>Ubicación</h2>
                    <p>Zona</p>
                    <select name="id_zona">
                        @forelse ($zonas as $zona)
                            <option value="{{$zona -> id}}">{{$zona -> ubicacion}}</option>
                        @empty
                            <p>No hay zonas actualmente</p>
                        @endforelse
                    </select>
                    <p>Buque</p>
                    <select name="id_buque">
                        @forelse ($buques as $buque)
                            <option value="{{$buque -> id}}">{{$buque -> nombre}}</option>
                        @empty
                            <p>No hay amarres actualmente</p>
                        @endforelse
                    </select>
                </div>

                <div class="div3">
                    <h2 class="num">3</h2>
                    <h2>Operador</h2>
                    <p>Seleccionar operador</p>
                    <select name="operador">
                        @forelse ($operadores as $operador)
                            <option value="{{$operador -> id}}">{{$operador -> name}}</option>
                        @empty
                            <p>No hay turnos actualmente</p>
                        @endforelse
                    </select>
                </div>

                <button class="crear btn">Crear</button>
            </form>
            <form action="" method="get">
                <button class="cancelar btn">Cancelar</button>
            </form>
        </body>
    </html>
</x-app-layout>
