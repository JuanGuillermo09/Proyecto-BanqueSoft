
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';






@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css',
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule,ReactiveFormsModule,MatIcon],
  providers: [AuthService],
})
export class IniciarSesionComponent {


  formInicio: FormGroup;

  showPassword: boolean = false; // Controla la visibilidad de la contraseña

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formInicio = this.fb.group({
      TypeUser: ['', Validators.required],
      Identificacion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      Contrasenia: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  loginUser() {
    const { TypeUser, Identificacion, Contrasenia } = this.formInicio.value;

    if (TypeUser === 'Cliente') {
      this.authService.loginCliente(Identificacion, Contrasenia).subscribe(
        response => {
          localStorage.setItem('token', response.token); // Guardar el token
          localStorage.setItem('userRole', 'Cliente'); // Guardar el rol como Cliente
          Swal.fire('Éxito', 'Inicio de sesión exitoso como Cliente', 'success').then(() => {
            this.router.navigate(['/cita']); // Redirigir a la página del cliente
          });
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    } else if (TypeUser === 'Administrador') {
      this.authService.loginAdministrador(Identificacion, Contrasenia).subscribe(
        response => {
          localStorage.setItem('token', response.token); // Guardar el token
          localStorage.setItem('userRole', 'Administrador'); // Guardar el rol como Administrador

          Swal.fire('Éxito', 'Inicio de sesión exitoso como Administrador', 'success').then(() => {
            this.router.navigate(['/admi/inicio']); // Redirigir a la página del administrador
          });
        },
        error => {
          Swal.fire('Error', error.error.message, 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Por favor seleccione un rol válido', 'error');
    }
  }


}







