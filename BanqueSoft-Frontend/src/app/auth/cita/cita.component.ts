import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CitasService } from '../../services/citas/citas.service';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [RouterModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatIcon,
    MatProgressSpinnerModule,],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css',
  providers: [AuthService, CitasService],
})
export class CitaComponent implements OnInit {

  nombreCliente: any;

  FormCita: FormGroup;

  resultadoCita: any;

  editingIndex: any;

  botonEditar: boolean = false

  isAdmin: boolean = false; // Indicador para saber si es Administrador o no

  availableHoras = [
   '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  isLoading = false


  constructor(private authService: AuthService,
    private formbuilder: FormBuilder,
    private citaService: CitasService) {
    this.FormCita = this.formbuilder.group({
      Fecha: ['', Validators.required],
      Hora: ['', Validators.required],
      Identificacion: ['', Validators.required],
      Nombre: ['', Validators.required],
    })

  }



  logout() {
    this.authService.logout(); // Llama al método de cierre de sesión
  }

  ngOnInit(): void {
    this.nombreCliente = localStorage.getItem('clientName'); // Obtiene el nombre del cliente
    console.log('Nombre del cliente:', this.nombreCliente); // Asegúrate de que no sea undefined

    this.citaService.getAllCita().subscribe((data) => {
      this.resultadoCita = data;
    });

       // Verificar el rol del usuario
       const userRole = localStorage.getItem('userRole');
       this.isAdmin = userRole === 'Administrador';

       // Si es administrador, cargar la tabla de citas
       if (this.isAdmin) {
         this.cargarCita();
       }



  }


  horasOcupadas: { [key: string]: string[] } = {};

// Método que se ejecuta cuando se cambia la fecha
onFechaChange(): void {
  const fechaSeleccionada = this.FormCita.get('Fecha')?.value;
  if (fechaSeleccionada) {
    // Filtra las citas por fecha y actualiza las horas ocupadas
    this.citaService.getAllCita().subscribe(citas => {
      // Reinicia las horas ocupadas para la nueva fecha
      this.horasOcupadas[fechaSeleccionada] = citas
        .filter(cita => cita.Fecha === fechaSeleccionada)
        .map(cita => cita.Hora);
    });
  }
}

// Verifica si una hora está ocupada para la fecha seleccionada
isHoraOcupada(hora: string): boolean {
  const fechaSeleccionada = this.FormCita.get('Fecha')?.value;
  return this.horasOcupadas[fechaSeleccionada]?.includes(hora) || false;
}

enviarDatos() {
  if (this.FormCita.valid) {
    const addCita = {
      Fecha: this.FormCita.value.Fecha,
      Hora: this.FormCita.value.Hora,
      Identificacion: this.FormCita.value.Identificacion,
      Nombre: this.FormCita.value.Nombre,
    };

    console.log('Datos a enviar:', addCita);
    this.isLoading = true;

    this.citaService.addCita(addCita).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.resultadoCita.push(response);
        this.resetForm();
        this.isLoading = false;
        Swal.fire({
          text: "Se guardó exitosamente tu Cita",
          icon: "success"
        });
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        this.isLoading = false;

        // Aquí se maneja el mensaje de error dependiendo del código
        if (err.error.message === "No se encontró un cliente con esa identificación.") {
          this.isLoading = false;
          Swal.fire({
            title: "Error",
            text: "No se encontró un cliente con esa identificación.",
            icon: "error"
          });
        } else if (err.error.message === "Lo siento, esa hora ya está ocupada. Elija otra.") {
          this.isLoading = false;
          Swal.fire({
            title: "Error",
            text: "Lo siento, esa hora ya está ocupada. Elija otra.",
            icon: "error"
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error inesperado. Intenta de nuevo más tarde.",
            icon: "error"
          });
        }
      }
    });
  } else {
    Swal.fire({
      title: "Información",
      text: "Debes completar todo el formulario.",
      icon: "info"
    });
  }
}


  eliminarCita(codCitas: any): void {
    Swal.fire({
      title: "¿Seguro?",
      text: "No podrás revertirlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.citaService.deleteCita(codCitas).subscribe({
          next: () => {
            // Filtra el array para eliminar el registro con el ID dado
            this.resultadoCita = this.resultadoCita.filter((item: any) => item.Cod_cita !== codCitas);
            Swal.fire({
              title: "Borrado!",
              text: "Tu archivo ha sido eliminado.",
              icon: "success"
            });
          },
          error: (err) => {
            console.error('Error al eliminar:', err);  // Añadir esto para depuración
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el registro.",
              icon: "error"
            });
          }
        });
      }
    });
  }

  resetForm() {
    this.editingIndex = 0;
    this.botonEditar = false
    this.FormCita.reset();
  }


  editarCita(edit: any, index: number): void {
    this.editingIndex = edit.Cod_cita;
    this.botonEditar = true
    this.FormCita = this.formbuilder.group({
      Fecha: [edit.Fecha],
      Hora: [edit.Hora],
      Identificacion: [edit.Identificacion],
      Nombre: [edit.Nombre]
    })
  }

    // Método para guardar los cambios en un registro editado
    editarDatos() {
      if (this.editingIndex !== null) {
        const editarCita = {
          Fecha: this.FormCita.value.Fecha,
          Hora: this.FormCita.value.Hora,
          Identificacion: this.FormCita.value.Identificacion,
          Nombre: this.FormCita.value.Nombre
        };

        this.citaService.editCita(this.editingIndex, editarCita).subscribe(
          () => {
            this.citaService.getAllCita().subscribe(data => {
              this.resultadoCita = data;
            });

            this.resetForm()

            Swal.fire({
              text: "Se editó exitosamente",
              icon: "success"
            });
          },
          error => {
            console.error('Error al editar:', error);  // Añadir esto para depuración
            Swal.fire({
              text: `Error al editar: ${error.message}`,
              icon: "error"
            });
          }
        );
      }
    }

    cargarCita(): void {
      this.citaService.getAllCita().subscribe({
        next: (data) => {
          this.resultadoCita = data;
        },
        error: (err) => {
          console.error('Error al cargar Cita:', err);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al cargar los Cita.",
            icon: "error"
          });
        }
      });
    }


    cambiarEstado(codCita: number, nuevoEstado: number): void {
      this.citaService.cambiarEstadoCita(codCita, nuevoEstado).subscribe({
        next: () => {
          // Actualiza La Cita localmente o vuelve a cargar los Cita
          this.cargarCita(); // Suponiendo que tienes un método para recargar los Cita
          Swal.fire({
            title: "Éxito",
            text: `La Cita ha sido ${nuevoEstado === 1 ? 'activado' : 'desactivado'} correctamente.`,
            icon: "success"
          });
        },
        error: (err) => {
          console.error('Error al cambiar La estado:', err);
          Swal.fire({
            title: "Error",
            text: "No se pudo cambiar La estado del Cita.",
            icon: "error"
          });
        }
      });
    }
}
