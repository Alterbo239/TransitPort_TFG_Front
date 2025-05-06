<x-app-layout>
    <!DOCTYPE html>
    <html>
        <head>
            <title>Realizar auditoria</title>
            <meta charset="utf-8">
            <meta name="csrf-token" content="{{ csrf_token() }}">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"/>
            <link href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css" rel="stylesheet">
            <link href="https://cdn.datatables.net/1.10.21/css/dataTables.bootstrap4.min.css" rel="stylesheet">

            <style>
                #detalles th, #orden th {
                    background: var(--Cinder-900, #152D65);
                    color: white;
                }
            </style>
        </head>
        <body>

        <div class="container mt-5">
            <h2 class="mb-4">Visualizar Auditoria</h2>
            <table id="detalles" class="table table-bordered">
                <thead>
                    <tr>
                        <th>Grúas</th>
                        <th>Operador</th>
                        <th>Buque</th>
                        <th>Contenedor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> {{ $orden -> id_grua }} </td>
                        <td> {{ $orden -> id_operador }} </td>
                        <td> {{ $orden -> id_buque }} </td>
                        <td> ID: {{ $orden -> id_contenedor }} </td>
                    </tr>
                    <tr>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td>
                        <td> Ubicacion: {{ $orden -> ubicacion }} </td>
                    </tr>
                    <tr>
                        <td>  </td>
                        <td>  </td>
                        <td>  </td>
                        <td> Destino: {{ $orden -> destino }} </td>
                    </tr>
                </tbody>
            </table>

            <table id="orden" class="table table-bordered">
                <thead>
                    <tr>
                        <th>Orden</th>
                        <th>Tipo</th>
                        <th>Turno</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> {{ $orden -> id }} </td>
                        <td> {{ $orden -> tipo }} </td>
                        <td> {{ $orden -> fecha_inicio }} </td>
                        <td> {{ $orden -> estado }} </td>
                    </tr>
                </tbody>
            </table>
        </div>

        </body>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
        <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
        <script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>

        <script type="text/javascript">
            $(document).ready(function () {
                let tableUp = $('#detalles').DataTable({
                    //Como van a ser datos fijos, usamos estas líneas:
                    order: [[0, "desc"]], //Para empezar de abajo a arriba.
                    ordering: false, //Para evitar poder ordenar.
                    pageLength: 3, //Limitamos las consultas a 10.
                    lengthMenu: [3], //Agregamos opciones de aumentar o dismiuir opciones de menu.
                });
                let tableDown = $('#orden').DataTable();
            });
        </script>
    </html>
</x-app-layout>
