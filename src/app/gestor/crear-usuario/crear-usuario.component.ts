import { Component, OnInit, NgModule  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpresasService } from '../../services/empresas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-usuario',
  imports: [ FormsModule, ReactiveFormsModule ],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent implements OnInit {
  empresas: any[] = [];
  form!: FormGroup;
  client: boolean = false;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresasService,
    private router: Router,
    private usuario: UsuarioService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      usuario: ['', Validators.required],
      ciudad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required, Validators.pattern(/^\d{9}$/)],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      password_confirmation: ['', Validators.required],
      cargo: ['', Validators.required],
      empresa: ['']
    }, {
      validator: this.passwordMatchValidator
    });

    this.form.get('cargo')?.valueChanges.subscribe((cargoValue) => {
      this.client = cargoValue === 'cliente';
      const empresaControl = this.form.get('empresa');

      if (this.client) {
        empresaControl?.setValidators([Validators.required]);
      } else {
        empresaControl?.clearValidators();
        empresaControl?.setValue('');
      }

      empresaControl?.updateValueAndValidity();
    });

    this.cargarEmpresas();
  }

  onSubmit() {
    if (this.form && this.form.invalid) {
      Swal.fire('Error', 'Por favor corrige los errores en el formulario.', 'error');
      return;
    }

    const formData = {
      ...this.form.value,
      id_gestor: this.auth.getUserID(),
    };

    this.usuario.crearUsuario(formData).subscribe({
      next: () => {
        Swal.fire({
          title: 'Usuario creado',
          text: 'El usuario se ha creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['gestor/usuarios']);
        });
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo crear el usuario', 'error');
        console.error(err);
      }
    });
  }
  
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('password_confirmation')!.value
      ? null : { mismatch: true };
  }

  cargarEmpresas() {
    this.empresaService.getSuppliersList().subscribe({
      next: (empresas) => this.empresas = empresas,
      error: (error) => console.error('Error al cargar empresas', error)
    });
    console.log(this.empresas);
  }

  mostrarEmpresas() {
    const cargo = (document.getElementById('cargo') as HTMLSelectElement).value;

    this.client = cargo === 'cliente';
    console.log(cargo);
    console.log(this.client);
  }
}