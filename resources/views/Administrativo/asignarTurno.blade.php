<x-app-layout>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Asignar turnos</title>

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
                    width: 340px;

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
            <h1 class="titulo"><img src="assets/Administrativo/buscarContenedorVer.svg">  Asignar Turno</h1>
            <form action="{{ route('actualizarTurno') }}" method="post">
                @csrf

                <div class="div1">
                    <h2 class="num">1</h2>
                    <h2>Operador</h2>
                    <p>Seleccione al operador</p>
                    <select name="id_operador">
                        @forelse ($operadores as $operador)
                            <option value="{{$operador -> id}}">{{$operador -> nombre}}</option>
                        @empty
                            <p>No hay operadores actualmente</p>
                        @endforelse
                    </select>
                </div>
                
                <div class="div2">
                    <h2 class="num">2</h2>
                    <h2>Turno</h2>
                    <p>Seleccione el turno</p>
                    <select name="id_turno">
                        @forelse ($turnos as $turno)
                            <option value="{{$turno -> id}}">{{$turno -> fecha_inicio}}</option>
                        @empty
                            <p>No hay zonas actualmente</p>
                        @endforelse
                    </select>
                </div>

                <button class="crear btn">Asignar</button>
            </form>
            <form action="" method="get">
                <button class="cancelar btn">Cancelar</button>
            </form>
        </body>
    </html>
</x-app-layout>