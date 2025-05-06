<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='utf-8' />
    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'></script>
    <script>
  document.addEventListener('DOMContentLoaded', function() {
    // Obtén el contenedor del calendario
    let calendarEl = document.getElementById('calendario');
    
    // Inicializa FullCalendar
    let calendario = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',  // Vista inicial del calendario
      locale: 'es',                 // Idioma en español

      // Evento para cuando se hace clic en una fecha
      dateClick: function(info) {
        // Obtiene la fecha seleccionada y la formatea en 'YYYY-MM-DD'
        let selectedDate = info.dateStr;

        // Pasa la fecha seleccionada al input de fecha
        let dateInput = document.getElementById('date-input');
        dateInput.value = selectedDate;
      }
    });

    // Renderiza el calendario
    calendario.render();
  });
</script>
  </head>
  <body>
    <input type="date" id="date-input" />
    <div id="calendario"></div>
  </body>
</html>