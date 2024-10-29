import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-cambiar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIcon, HttpClientModule],
  templateUrl: './cambiar.component.html',
  styleUrls: ['./cambiar.component.css'], // Corrige 'styleUrl' a 'styleUrls'
  providers: [AuthService]
})
export class CambiarComponent implements OnInit {

  showPassword: boolean = false; // Controla la visibilidad de la contraseña

  cambiarContraseniaForm: FormGroup;
  token: string = ''; // Inicializa con un valor vacío

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute) {
    this.cambiarContraseniaForm = this.fb.group({
      Contrasenia: ['', [Validators.required]],
      Encriptado: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para comprobar que las contraseñas coinciden
  passwordMatchValidator(form: FormGroup) {
    return form.get('Contrasenia')?.value === form.get('Encriptado')?.value
      ? null : { notMatching: true };
  }

  ngOnInit(): void {
    // Obtenemos el token de los parámetros de la URL
    this.token = this.route.snapshot.paramMap.get('token') || ''; // Asegúrate de que el nombre del parámetro coincida con la ruta
  }

  // Método para cambiar la contraseña
  cambiarContrasenia() {
    if (this.cambiarContraseniaForm.valid) {
      const { Contrasenia } = this.cambiarContraseniaForm.value;

      this.authService.cambiarContrasenia(this.token, Contrasenia).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Contraseña actualizada',
            text: 'La contraseña se ha actualizado exitosamente.',
          }).then(() => {
            // Aquí puedes redirigir o cerrar la pestaña
            window.close(); // Cierra la pestaña actual
            // O redirigir a una página específica:
            // this.router.navigate(['/pagina-deseada']);
          });
        },
        error: (err) => {
          console.error('Error al cambiar la contraseña:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cambiar la contraseña.',
          });
        }
      });
    }
  }


}
