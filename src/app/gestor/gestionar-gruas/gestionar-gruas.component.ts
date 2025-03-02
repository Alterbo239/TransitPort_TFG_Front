import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GruaService } from '../../services/grua.service'; // Importa el servicio
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

@Component({
  selector: 'app-gestionar-gruas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // Importa ReactiveFormsModule y HttpClientModule
  templateUrl: './gestionar-gruas.component.html',
  styleUrls: ['./gestionar-gruas.component.css'],
})
export class GestionarGruasComponent implements OnInit {
  gruaForm: FormGroup; // Formulario reactivo

  availableGruas: any[] = []; // Lista de grúas disponibles
  availableZonas: any[] = []; // Lista de zonas disponibles

  constructor(
    private fb: FormBuilder, // FormBuilder para crear el formulario
    private gruaService: GruaService // Servicio para obtener grúas y zonas
  ) {
    // Inicializa el formulario reactivo
    this.gruaForm = this.fb.group({
      selectedZona: ['', Validators.required], // Zona seleccionada (requerida)
      selectedGrua: ['', Validators.required], // Grúa seleccionada (requerida)
    });
  }

  ngOnInit(): void {
    // Obtener grúas y zonas disponibles al inicializar el componente
    this.gruaService.getGruas().subscribe({
      next: (data) => (this.availableGruas = data), // Asignar grúas disponibles
      error: (err) => console.error('Error al obtener grúas:', err), // Manejar errores
    });

    this.gruaService.getZonas().subscribe({
      next: (data) => (this.availableZonas = data), // Asignar zonas disponibles
      error: (err) => console.error('Error al obtener zonas:', err), // Manejar errores
    });
  }

  // Enviar el formulario
  onSubmit(): void {
    if (this.gruaForm.invalid) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
  
    // Crear el payload con la zona y la grúa seleccionada
    const payload = {
      id_zona: this.gruaForm.value.selectedZona,
      id_grua: this.gruaForm.value.selectedGrua,
    };
  
    console.log('Payload enviado:', payload); // Depuración: Ver el payload
  
    // Enviar el payload al backend usando el servicio
    this.gruaService.asignarGruas(payload).subscribe({
      next: () => {
        alert('Grúa asignada correctamente.');
        this.gruaForm.reset();
      },
      error: (err) => {
        console.error('Error al asignar grúa:', err); // Manejar errores
        alert('Hubo un error al asignar la grúa. Por favor, inténtalo de nuevo.');
      },
    });
  }
}