<x-app-layout>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Crear patio y zona</title>

            <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
            <link href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css" rel="stylesheet">
            <link href="https://cdn.datatables.net/1.10.21/css/dataTables.bootstrap4.min.css" rel="stylesheet">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
            <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
            <script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>

            <style>
                #zona table{

                    margin-top: 40%;

                }

                #tabla {

                    margin-top:10%;

                }

                #zona{

                    border: none;

                }

                #zona .dataTables_scroll>.dataTables_scrollHead>.dataTables_scrollHeadInner {

                    background: var(--Cinder-900, #152D65) !important;
                    color: var(--Cinder-50, #F1F5FE);
                    width: 100px;
                    height: 54px;
                    padding-left: -70px;
                    border: none;
                    text-align: center;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    overflow: scroll !important;

                }

                #zona tbody {
                    background: #F1F5FE;
                    border: none;

                }

                #zona td {
                    background: #FFF;
                    color: #000000;
                    border-top: 10px solid #F1F5FE;
                    border-right: none;

                }

                h1 {
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
                label{
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

                input{

                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    background: var(--Cinder-100, #E3E9FB) !important;

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

                #email{

                    margin-bottom: 30px;

                }

                .div1 {
                    position: absolute;
                    left: 10%;
                    top: 10%;
                }
                .div2 {
                    position: absolute;
                    left: 10%;
                    top: 15%;
                    margin-top:140px;
                }

                .div3 {
                    position: absolute;
                    left: 65%;
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
                .anyadirBoton {

                    border-radius: 0px;
                    color: #C0D2F7;
                    text-align: center;
                    font-size: 19px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    display: inline-flex;
                    padding: 10px 54px 12px 54px;
                    justify-content: center;
                    align-items: center;
                    background: var(--Cinder-950, #040813);

                }

                .anyadirPatio {

                    border-radius: 0px;
                    color: #C0D2F7;
                    text-align: center;
                    font-size: 19px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    display: inline-flex;
                    padding: 10px 54px 12px 54px;
                    justify-content: center;
                    align-items: center;
                    background: var(--Cinder-950, #040813);
                    margin-top:597px;
                    margin-left: 192px;;

                }

                #valores{
                    margin-top: 10px;
                    width: 100%;
                    margin-bottom: 20px;
                }

                #valores>label  {
                    margin-bottom: 40px;
                    margin-top: 10px;
                    width: 80px;
                    text-align: center;

                }

                #valores>div>input {
                    width: 80px;

                }



            </style>
        </head>

        <body>
            <h1><img src="assets/Gestor/crearPatioVer.png">  Crear Patio | Zona</h1>
             <form action="{{ route('guardarPatio') }}" method="post">
                @csrf

                <div class="div1">
                    <h2 class="num">1</h2>
                    <h2>Nombre</h2>
                    <label for="name">Nombre</label>
                    <input type="text" id="name" name="nombre">

                </div>

                <div class="div2">
                    <h2 class="num">2</h2>
                    <h2>Dimensiones</h2>
                    <label for="valorX">Valor X:</label>
                    <input type="number" name="x" id="valorX">
                    <label for="valorY">Valor Y:</label>
                    <input type="number" name="y" id="valorY">
                    <label for="valorZ">Valor Z:</label>
                    <input type="number" name="z" id="valorZ">

                </div>

                {{-- es un input invisible que recoge el id del gestor, para asignarlo al patio --}}
                <input type="hidden" name="id_gestor" value="{{ Auth::user()->id }}">

                <button type="submit" class="anyadirPatio btn btn-primary">Añadir</button>

            </form>

            <form action="{{ route('guardarZona') }}" method="post">
            @csrf
                <div class="div3">
                    <h2 class="num">3</h2>
                    <h2>Zonas</h2>
                    <label for="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre">

                    <div class="flex-row d-flex justify-content-between" id="valores">
                        <div class="d-flex flex-column justify-content-center">
                            <label class="d-flex justify-content-center" for="valX">Valor X:</label>
                            <input type="number" class="valX" name="X" id="valX">
                        </div>

                        <div class="d-flex flex-column">
                            <label class="d-flex justify-content-center" for="valY">Valor Y:</label>
                            <input type="number" name="Y" id="valY">
                        </div>

                        <div class="d-flex flex-column">
                            <label class="d-flex justify-content-center" for="valZ">Valor Z:</label>
                            <input type="number" name="Z" id="valZ">
                        </div>
                </div>

                <input type="hidden" name="id_gestor" value="{{ Auth::user()->id }}">
                <input type="hidden" name="id_patio" value="{{ session('id_patio') }}">
                {{-- se pasa el ultimo id de patio creado en la sesion actual --}}

                    <button type="submit" class="anyadirBoton btn btn-primary">Añadir</button>
                </form>

                <div id="tabla">
                <table id="zona" class="table table-bordered">
                        <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                </table>
                </div>

                </div>

                <a class="crear btn btn-primary">Aceptar</a>

                <a class="cancelar btn btn-warning">Cancelar</a>

        </body>
        <script type="text/javascript">
           $(document).ready(function () {
                let table = $('#zona').DataTable({
                    processing: true,
                    serverSide: true,
                    ajax: '{{ route("verZona") }}',
                    columns: [
                        { data: 'nombre', name: 'nombre' },
                        { data: 'X', name: 'X' },
                        { data: 'Y', name: 'Y' },
                        { data: 'Z', name: 'Z' }
                    ],
                   "info": false,
                   "paging": false,
                   "searching": true,
                   "responsive": true,
                   "ordering": false,
                   "scrollY": "200px",

                });
            });
        </script>
    </html>
    </x-app-layout>
