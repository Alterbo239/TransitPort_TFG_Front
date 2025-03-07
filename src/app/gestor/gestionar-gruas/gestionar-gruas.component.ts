import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GruaService } from '../../services/grua.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestionar-gruas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestionar-gruas.component.html',
  styleUrls: ['./gestionar-gruas.component.css'],
})
export class GestionarGruasComponent implements OnInit {
  form: FormGroup; 
  gruas: any[] = []; //array para guardar las gruas
  zonas: any[] = []; //para guardar las zonas

  constructor(
    private fb: FormBuilder,
    private gruaService: GruaService
  ) {
    //inicializo el form group
    this.form = this.fb.group({
      //le paso los nombres de los form controls y les paso un valor por defecto y la validación
      zonaId: ['', Validators.required], 
      gruaId: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  //llamo a los metodos del servicio para cargar los datos
  cargarDatos(): void {
    this.gruaService.getGruas().subscribe({
      next: (gruas) => (this.gruas = gruas),
      error: (err) => console.error('Error cargando grúas:', err),
    });

    this.gruaService.getZonas().subscribe({
      next: (zonas) => (this.zonas = zonas),
      error: (err) => console.error('Error cargando zonas:', err),
    });
  }

  //se envia el formulario
  enviar(): void {
  const datos = {
    id_zona: this.form.value.zonaId,
    id_grua: this.form.value.gruaId,
  };

  console.log('Datos enviados:', datos);

  if (!datos.id_zona || !datos.id_grua) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Debe seleccionar una zona y una grúa.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  this.gruaService.asignarGruas(datos).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        text: 'Grúa asignada correctamente.',
        confirmButtonText: 'Aceptar'
      });
      this.form.reset();
    },
    error: (err) => {
      console.error('Error en la petición:', err);
    },
  });
}

}