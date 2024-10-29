import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule, MatProgressSpinnerModule,CommonModule  ],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css',
  providers: [AuthService],
})
export class RecuperarComponent {

  isLoading = false

  recuperarContraseniaForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.recuperarContraseniaForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      identificacion: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  enviarCorreo() {
    if (this.recuperarContraseniaForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos correctamente.'
      });
      return;
    }
    this.isLoading = true;
    const { tipoDocumento, identificacion } = this.recuperarContraseniaForm.value;
    // Llamar al servicio para enviar el correo
    this.authService.enviarCorreoRecuperacion(tipoDocumento, identificacion).subscribe(
      (response) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se ha enviado un correo electrónico con instrucciones para recuperar tu contraseña.'
        });
        this.recuperarContraseniaForm.reset();  // Limpiar el formulario
      },
      (error) => {
        console.error('Error al enviar correo:', error); // Muestra el error en consola para depuración
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar el correo. Inténtalo de nuevo.'
        });
      }
    );
  }

}
