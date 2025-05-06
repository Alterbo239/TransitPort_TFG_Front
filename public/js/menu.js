import './bootstrap';


document.addEventListener("DOMContentLoaded", function () {
    // Variable para controlar si el menú está visible
    let menuVisible = false;

    // Obtener el botón y el menú por su ID
    const boton = document.getElementById('botonMostrarMenu');
    const menu = document.getElementById('menu');

    // Verificar que los elementos existen
    if (!boton || !menu) {
        console.error("No se encontró el botón o el menú en el DOM.");
        return;
    }

    // Función para alternar la visibilidad del menú
    function mostrarMenu() {
        menuVisible = !menuVisible;

        if (menuVisible) {
            // Ocultar el botón y mostrar el menú
            boton.setAttribute('hidden', 'true');
            menu.style.display = "block"; // Puedes usar clases de Tailwind (ej. quitar 'hidden')

            // Determinar la URL actual para ajustar clases de los enlaces
            let currentUrl = window.location.pathname;
            const enlaceOrdenes = document.getElementById('ordenes');
            const enlaceNotificaciones = document.getElementById('notificaciones');

            switch (currentUrl) {
                case '/operador/ordenes':
                    enlaceOrdenes?.classList.add('actual');
                    enlaceNotificaciones?.classList.remove('actual');
                    break;
                case '/operador/notificaciones':
                    enlaceNotificaciones?.classList.add('actual');
                    enlaceOrdenes?.classList.remove('actual');
                    break;
                default:
                    // Opcional: manejar otros casos
                    break;
            }
        } else {
            // Mostrar el botón y ocultar el menú
            boton.removeAttribute('hidden');
            menu.style.display = "none";
        }
    }

    // Asignar el evento de clic al botón
    boton.addEventListener('click', mostrarMenu);

    // (Opcional) Si deseas cerrar el menú al hacer clic fuera de él,
    // puedes agregar un listener global.
    document.addEventListener('click', function(event) {
        // Si se hace clic fuera del menú y del botón, cerrar el menú
        if (menuVisible && !menu.contains(event.target) && event.target !== boton) {
            menuVisible = false;
            boton.removeAttribute('hidden');
            menu.style.display = "none";
        }
    });

    console.log("Menu.js cargado correctamente.");
});
