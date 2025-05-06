<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/notificaciones.css') }}">
</head>

<body>

    <div class="d-flex flex-column vh-100 col-9 col-xl-9 col-lg-9 col-md-9" id="cuerpo">

        <div class="d-flex flex-row" id="titulo">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="62" viewBox="0 0 50 62" fill="none">
                <path d="M7 51.9997V24.9998C7 20.2259 8.89642 15.6475 12.2721 12.2718C15.6477 8.89618 20.2261 6.99976 25 6.99976C29.7739 6.99976 34.3523 8.89618 37.7279 12.2718C41.1036 15.6475 43 20.2259 43 24.9998V51.9997M7 51.9997H43H7ZM7 51.9997H1H7ZM43 51.9997H49H43ZM22 60.9997H28H22Z" fill="#040813"/>
                <path d="M7 51.9997V24.9998C7 20.2259 8.89642 15.6475 12.2721 12.2718C15.6477 8.89618 20.2261 6.99976 25 6.99976C29.7739 6.99976 34.3523 8.89618 37.7279 12.2718C41.1036 15.6475 43 20.2259 43 24.9998V51.9997M7 51.9997H43M7 51.9997H1M43 51.9997H49M22 60.9997H28" stroke="#040813" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M25 7C26.6569 7 28 5.65685 28 4C28 2.34315 26.6569 1 25 1C23.3431 1 22 2.34315 22 4C22 5.65685 23.3431 7 25 7Z" fill="#040813" stroke="#040813" stroke-width="2"/>
                </svg>
            <h2>Notificaciones</h2>
          </div>

          <div class="d-flex flex-column align-items-center" id="body-notificaciones">

            <ul>

                @foreach($task as $t)

                    @if($t->visto == '0')

                        @if($t->tipo == 'carga')

                        <li class="carga">{{$t->administrativo->nombre}} te ha asignado una nueva orden de {{$t->tipo}}</li>
                        @endif

                        @if($t->tipo == 'descarga')

                        <li class="descarga">{{$t->administrativo->nombre}} te ha asignado una nueva orden de {{$t->tipo}}</li>
                        @endif

                    @endif

                @endforeach

            </ul>

          </div>


    </div>

</body>
</html>


