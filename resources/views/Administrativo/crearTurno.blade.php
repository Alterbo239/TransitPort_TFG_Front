<x-app-layout>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Crear turno</title>

            <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
            <!-- Calendario -->
            <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'></script>
            <script>
                window.addEventListener('load', inicio);

                function inicio() {
                    document.getElementById('icono').addEventListener('click', mostrarCalendario);
                }

                function mostrarCalendario() {
                    let calendario = document.getElementById('calendario');

                    if (calendario.style.visibility != 'hidden') {
                        calendario.style.visibility = 'hidden';
                    } else {
                        calendario.style.visibility = 'visible';
                    }
                }

                document.addEventListener('DOMContentLoaded', function() {
                    let calendar = document.getElementById('calendario');
                    let calendario = new FullCalendar.Calendar(calendar, {
                        initialView: 'dayGridMonth', //Vista del calendario. (Mes fraccionado por dias).
                        locale: 'es', //Cambiamos al Castellano.

                        /**
                        * Funcion para actualizar el "input date" al seleccionar un dia en el calendario.
                        * info: Dia seleccionado.
                        */
                        dateClick: function(info) {
                            let fechaSeleccionada = info.dateStr; //Convertimos la fecha a formato YYYY-MM-DD.

                            /**
                            * Primero comprobamos que las celdas no esten seleccionadas. Y si lo estan, las deseleccionamos.
                            * En principio solo hay una fecha seleccionada, pero por si fallase indicamos que coja todas las celdas "seleccionadas".
                            */
                            let celdas = document.querySelectorAll('.fc-day.selected');
                            celdas.forEach(function(celda) {
                                celda.classList.remove('selected');

                                //A partir de la celda que hayamos cogido, le cambiamos el color del numero de la celda.
                                let numSelected = celda.querySelector('.fc-daygrid-day-number');
                                if (numSelected) {
                                    numSelected.style.color = '';
                                }
                            });

                            //Ahora pillamos la celda con la fecha actual y le agregamos la calse "selected".
                            let celda = document.querySelector(`[data-date="${fechaSeleccionada}"`);
                            if (celda) {
                                celda.classList.add('selected');

                                //Al igual que antes, le cambiamos el color del numero de la celda para que sea más legible.
                                let num = celda.querySelector('.fc-daygrid-day-number');
                                if (num) {
                                    num.style.color = 'white';
                                }
                            }

                            //Cogemos el input y le actualizamos el valor.
                            let input = document.getElementById('fecha');
                            input.value = fechaSeleccionada;
                        }
                    });

                    //Generamos el calendario.
                    calendario.render();
                });
            </script>

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
                    width: 280px;

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

                input {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    background: var(--Cinder-100, #E3E9FB);

                    border: none;

                    font-size: 1.2rem;

                    display: inline-block;
                    padding: 0% 2%;
                    width: 457px;
                    height: 49px;
                    align-items: center;
                }
                input[type="date"]::-webkit-calendar-picker-indicator {
                    background: url('assets/Administrativo/calendario.svg') no-repeat;
                    background-size: 100%;
                    background-position: center;
                    pointer-events: none;
                }
                #icono {
                    position: relative;
                    left: -10%;
                    cursor: pointer;
                }
                .hora {
                    width: 220px;
                }

                .fecha {
                    display: flex;
                    justify-content: space-between;
                    width: 457px;
                }
                #fecha {
                    pointer-events: none;
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

                /* Estilo del calendario */
                #calendario {
                    float: right;
                    margin-right: 3%;
                    padding: 60px;
                    width: 50%;
                    box-shadow: 0px 4px 32px 0px rgba(170, 170, 170, 0.03);
                    border: 1px solid #EBEBEB;
                }
                :root {
                    --fc-border-color: none;
                    --fc-today-bg-color:rgba(35, 97, 212, 0.2);
                }
                .fc .fc-col-header-cell-cushion, .fc-daygrid-day-number {
                    color: var(--Light-Primary, #333);
                    text-decoration: none;
                }
                .fc-daygrid-day-frame {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .fc-prev-button, .fc-next-button {
                    background-color: var(--Cinder-200, #C0D2F7) !important;
                    border: none !important;
                    margin: 0px 2% !important;
                    border-radius: 16px !important;
                    width: 40px !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                }
                .fc-icon {
                    color: #152D65;
                }
                .fc-day:hover, .fc-daygrid-day.fc-day-today:hover {
                    color: #040813;
                    background-color: #C0D2F7 !important;
                }
                .fc-day.selected {
                    background-color: #2362D4 !important;
                }
                .fc-day {
                    background-color: none;
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
            <h1 class="titulo"><img src="assets/Administrativo/crearTurnoVer.svg">  Crear Turno</h1>
            <form action="{{ route('guardarTurno') }}" method="post">
                @csrf

                <div id='calendario' style="visibility: hidden;"></div>

                <div class="div1">
                    <h2 class="num">1</h2>
                    <h2>Fecha</h2>
                    <p>Seleccionar fecha</p>
                    <input class="date" type="date" name="fecha" id="fecha" readonly><img src="assets/Administrativo/calendario.svg" id="icono">
                </div>
                
                <div class="div2">
                    <h2 class="num">2</h2>
                    <h2>Horario</h2>
                    <div class="fecha">
                        <label for="hora_inicio">Hora inicio</label>

                        <p>Tipo</p>
                    </div>
                    <div class="fecha">
                        <input class="hora" type="time" name="hora_inicio">

                        <select class="hora" name="horas">
                            <option value="8">8 horas</option>
                            <option value="10">10 horas</option>
                            <option value="12">12 horas</option>
                        </select>
                    </div>
                </div>

                <button class="crear btn">Crear</button>
            </form>
            <form action="" method="get">
                <button class="cancelar btn">Cancelar</button>
            </form>
        </body>

        <script>

        </script>
    </html>
</x-app-layout>