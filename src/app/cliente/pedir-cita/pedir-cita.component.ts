import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FullCalendarModule } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { BuquesService } from '../../services/buques.service';
import { Buque } from '../../models/buque';
import { AuthService } from '../../services/auth.service';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-pedir-cita',
  imports: [ ReactiveFormsModule, FullCalendarModule ],
  templateUrl: './pedir-cita.component.html',
  styleUrl: './pedir-cita.component.css'
})
export class PedirCitaComponent {
  form!: FormGroup;
  mostrarCalendario: boolean = false;
  buques: Buque[] = [];
  confirmDisabled: boolean = true;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    dateClick: this.handleDateClick.bind(this),
  };

  constructor(
    private fb: FormBuilder,
    private citas: CitasService,
    private buque: BuquesService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id_buque: ['', Validators.required],
      fecha_pedida: ['', Validators.required],
      tipo: ['carga', Validators.required],
    });

    const userId = this.auth.getUserID();
    if (userId !== null) {
      this.buque.getBuquesFiltrados(userId).subscribe(
        (data: Buque[]) => {
          this.buques = data;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar los buques',
            text: 'No se pudieron cargar los buques disponibles. Inténtalo más tarde.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Usuario no identificado',
        text: 'No se pudo obtener el ID del usuario. Por favor, inicia sesión de nuevo.',
      });
    }
  }

  // ----- Calendario -----

  handleDateClick(arg: any) {
    const fechaSeleccionada = new Date(arg.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a medianoche para comparar solo fechas

    if (fechaSeleccionada < today) {
      Swal.fire({
        icon: 'error',
        title: 'Fecha inválida',
        text: 'No puedes seleccionar una fecha anterior a hoy.',
      });
      return;
    }

    fechaSeleccionada.setHours(12, 0, 0, 0);
    const formattedDate = fechaSeleccionada.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    this.form.get('fecha_pedida')?.setValue(formattedDate);
    this.confirmDisabled = false;
  }

  toggleCalendario() {
    this.mostrarCalendario = !this.mostrarCalendario;
  }

  confirmarCita() {
    this.mostrarCalendario = false;
  }

  cancelarCita() {
    this.mostrarCalendario = false;
    this.form.get('fecha')?.setValue('');
    this.confirmDisabled = true;
  }

  // ----- Envío del formulario -----
  onSubmit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.',
      });
      return;
    }

    const citaData = {
      ...this.form.value,
      id_cliente: this.auth.getUserID(),
    };

    this.citas.crearCita(citaData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Cita solicitada',
          text: 'Tu cita ha sido solicitada correctamente.',
        }).then(() => {
          this.form.reset();
          this.mostrarCalendario = false;
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al solicitar la cita',
          text: 'No se pudo solicitar la cita. Inténtalo más tarde.',
        });
        console.error(error);
      }
    });
  }
}
