<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="{{ asset('css/menu.css') }}">
</head>
<body>

<div class="d-flex vh-100 col-12 col-xl-3 col-lg-3 col-md-3">
  <!-- Quitamos el binding Angular [style.display] -->
  <div class="sidebar bg-light col-12 col-xl-12 col-lg-12 col-md-12" id="sidebar">
    <div class="navbar-nav flex-column justify-content-between" id="menu">
      <div id="superior">
        <div class="d-flex flex-column justify-content-center align-items-center" id="perfil">
          <!-- Reemplazamos (click)="mostrarMenu()" por onclick o lo asignamos desde JS -->
          <a class="nav-link d-flex flex-column" href="./perfil">
            <img src="{{ asset('assets/pruebaPerfilMenu.png') }}" alt="imagenPerfil">
            {{ $usuario->name }}
          </a>
        </div>

        <!-- Asigna ids únicos a cada enlace -->
        <a class="nav-link enlace" href="./ordenes" id="ordenes">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="46" viewBox="0 0 32 46" fill="none">
            <path
              d="M6.25 34.375H19.25M6.25 26.25H25.75M6.25 18.125H25.75M7.875 5.125H1.375V44.125H30.625V5.125H24.125M7.875 1.875H24.125L22.0938 8.375H9.90625L7.875 1.875Z"
              stroke="#F1F5FE"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
          Órdenes
        </a>

        <a class="nav-link enlace" href="./verNotificaciones" id="notificaciones">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="46" viewBox="0 0 55 52" fill="none">
            <path
              d="M13.5532 41.1667V21.6667C13.5532 18.2189 14.9811 14.9123 17.5228 12.4744C20.0645 10.0364 23.5118 8.66675 27.1064 8.66675C30.7009 8.66675 34.1482 10.0364 36.6899 12.4744C39.2316 14.9123 40.6596 18.2189 40.6596 21.6667V41.1667M13.5532 41.1667H40.6596M13.5532 41.1667H9.03546M40.6596 41.1667H45.1773M24.8475 47.6667H29.3652"
              stroke="#F1F5FE"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M27.1064 8.66671C28.3539 8.66671 29.3653 7.69666 29.3653 6.50004C29.3653 5.30342 28.3539 4.33337 27.1064 4.33337C25.8589 4.33337 24.8475 5.30342 24.8475 6.50004C24.8475 7.69666 25.8589 8.66671 27.1064 8.66671Z"
              stroke="#F1F5FE"
              stroke-width="2"
            />
          </svg>
          Notificaciones <p id="cantidadNotificaciones">{{$noLeidas}}</p>

        </a>
      </div>

      <!-- Quitamos routerLink y dejamos un enlace normal para logout -->
      <a class="nav-link logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
          <path
            d="M12.168 43.3333C11.1699 43.3333 10.3372 42.9996 9.66985 42.3323C9.00252 41.665 8.66813 40.8315 8.66669 39.832V12.168C8.66669 11.1698 9.00108 10.3371 9.66985 9.66979C10.3386 9.00246 11.1714 8.66807 12.168 8.66663H26.0412V10.8333H12.168C11.8344 10.8333 11.5281 10.972 11.2494 11.2493C10.9706 11.5266 10.8319 11.8328 10.8334 12.168V39.8341C10.8334 40.1663 10.972 40.4718 11.2494 40.7506C11.5267 41.0294 11.8322 41.1681 12.1659 41.1666H26.0412V43.3333H12.168ZM35.6677 33.6678L34.1467 32.1078L39.1712 27.0833H19.916V24.9166H39.1712L34.1445 19.89L35.6655 18.3343L43.3334 26L35.6677 33.6678Z"
            fill="white"
          />
        </svg>
        <form action="{{ route('logout') }}" method="post">
            @csrf
            <button type="submit" id="#enlace" class="boton-logout">Logout</button>
        </form>
      </a>

    </div>
  </div>
</div>

</body>
</html>
