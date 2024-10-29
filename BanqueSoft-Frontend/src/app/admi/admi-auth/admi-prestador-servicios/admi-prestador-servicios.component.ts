import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { PrestadorServiceService } from '../../services/prestador-service/prestador-service.service';

@Component({
  selector: 'app-admi-prestador-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIcon, HttpClientModule],
  templateUrl: './admi-prestador-servicios.component.html',
  styleUrl: './admi-prestador-servicios.component.css',
  providers: [PrestadorServiceService]
})
export class AdmiPrestadorServiciosComponent implements OnInit {

  FormPrestadorServicio: FormGroup;

  resultadoPrestador: any;

  editingIndex: any;

  botonEditar: boolean = false


  constructor(private formBuilder: FormBuilder, private prestadorService: PrestadorServiceService) {


    this.FormPrestadorServicio = this.formBuilder.group({

      Tipo_documento: ["", Validators.required],
      Identificacion: [0, Validators.required],
      Nombre: ["", Validators.required],
      Apellidos: ["", Validators.required],
      Genero: ["", Validators.required],
      Telefono: [0, Validators.required],
      Direccion: ["", Validators.required],
      Email: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.prestadorService.getAllPrestadorServicio().subscribe((data) => {
      this.resultadoPrestador = data;
    })
  }

  enviarDatos() {
    if (this.FormPrestadorServicio.valid) {
      const addPrestadorServicio = {
        Tipo_documento: this.FormPrestadorServicio.value.Tipo_documento,
        Identificacion: this.FormPrestadorServicio.value.Identificacion,
        Nombre: this.FormPrestadorServicio.value.Nombre,
        Apellidos: this.FormPrestadorServicio.value.Apellidos,
        Genero: this.FormPrestadorServicio.value.Genero,
        Telefono: this.FormPrestadorServicio.value.Telefono,
        Direccion: this.FormPrestadorServicio.value.Direccion,
        Email: this.FormPrestadorServicio.value.Email,
      };

      console.log('Datos a enviar:', addPrestadorServicio);

      this.prestadorService.addPrestadorServicio(addPrestadorServicio).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.resultadoPrestador.push(response);
          this.resetForm();
          Swal.fire({
            text: "Se guardó exitosamente",
            icon: "success"
          });
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          Swal.fire({
            title: "Error",
            text: "No se pudo guardar el registro.",
            icon: "error"
          });
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




  eliminarPrestadorServicio(codPrestador: any): void {
    Swal.fire({
      title: '¿Seguro?',
      text: 'No podrás revertirlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.prestadorService.deletePrestadorServicio(codPrestador).subscribe({
          next: (response) => {
            // Cambia esto a 'Prestador Servicio eliminado correctamente'
            if (response.message === 'Prestador Servicio eliminado correctamente') {
              // Elimina el prestador del arreglo local para actualizar la tabla
              this.resultadoPrestador = this.resultadoPrestador.filter((item: any) => item.Cod_prestador_servicio !== codPrestador);

              Swal.fire({
                title: 'Borrado!',
                text: response.message,
                icon: 'success'
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: response.message,
                icon: 'error'
              });
            }
          },
          error: (err) => {
            Swal.fire({
              title: 'Error',
              text: 'No se puede eliminar el Prestador Servicio porque está asociado con uno o más Servicios.',
              icon: 'error'
            });
          }
        });
      }
    });
  }




  editarPrestadorServicios(edit: any, index: number): void {
    this.editingIndex = edit.Cod_prestador_servicio;
    this.botonEditar = true
    this.FormPrestadorServicio = this.formBuilder.group({
      Tipo_documento: [edit.Tipo_documento],
      Identificacion: [edit.Identificacion],
      Nombre: [edit.Nombre],
      Apellidos: [edit.Apellidos],
      Genero: [edit.Genero],
      Telefono: [edit.Telefono],
      Direccion: [edit.Direccion],
      Email: [edit.Email],

    })
  }



  // Método para guardar los cambios en un registro editado
  editarDatos() {
    if (this.editingIndex !== null) {
      const editarPrestador = {
        Tipo_documento: this.FormPrestadorServicio.value.Tipo_documento,
        Identificacion: this.FormPrestadorServicio.value.Identificacion,
        Nombre: this.FormPrestadorServicio.value.Nombre,
        Apellidos: this.FormPrestadorServicio.value.Apellidos,
        Genero: this.FormPrestadorServicio.value.Genero,
        Telefono: this.FormPrestadorServicio.value.Telefono,
        Direccion: this.FormPrestadorServicio.value.Direccion,
        Email: this.FormPrestadorServicio.value.Email,

      };

      this.prestadorService.editPrestadorServicio(this.editingIndex, editarPrestador).subscribe(
        () => {
          this.prestadorService.getAllPrestadorServicio().subscribe(data => {
            this.resultadoPrestador = data;
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

  resetForm() {
    this.editingIndex = 0;
    this.botonEditar = false
    this.FormPrestadorServicio.reset();
  }

  cargarPrestadorServicio(): void {
    this.prestadorService.getAllPrestadorServicio().subscribe({
      next: (data) => {
        this.resultadoPrestador = data;
      },
      error: (err) => {
        console.error('Error al cargar promocion:', err);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al cargar los promocion.",
          icon: "error"
        });
      }
    });
  }

  cambiarEstado(codPrestadorServicio: number, nuevoEstado: number): void {
    this.prestadorService.cambiarEstadoPrestadorServicio(codPrestadorServicio, nuevoEstado).subscribe({
      next: () => {
        // Actualiza La Promocion localmente o vuelve a cargar los promocion
        this.cargarPrestadorServicio(); // Suponiendo que tienes un método para recargar los promocion
        Swal.fire({
          title: "Éxito",
          text: `El Prestador Servicio ha sido ${nuevoEstado === 1 ? 'activado' : 'desactivado'} correctamente.`,
          icon: "success"
        });
      },
      error: (err) => {
        console.error('Error al cambiar La estado:', err);
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar La estado del Prestador Servicio.",
          icon: "error"
        });
      }
    });
  }

}
