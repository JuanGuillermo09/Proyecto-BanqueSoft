import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiciosService } from './../../../services/servicios/servicios.service';


import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { PrestadorServiceService } from '../../services/prestador-service/prestador-service.service';
import { AdmiModelServiciosComponent } from './admi-model-servicios/admi-model-servicios.component';

@Component({
  selector: 'app-admi-servicios',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon, CommonModule, HttpClientModule],
  templateUrl: './admi-servicios.component.html',
  styleUrl: './admi-servicios.component.css',
  providers: [PrestadorServiceService, CategoriasService, ServiciosService,],
})
export class AdmiServiciosComponent {

  Modal: boolean = false;

  editingIndex: any;
  botonEditar: boolean = false

  imagenUrl: string | ArrayBuffer | null = null;


  verImagen: any

  serviciosForm: FormGroup;

  resultadosServicios: any
  idPrestador: any;
  idCategoria: any;
  CategoriaActiva: any;

  PrestadorActivo: any;

  resultadoValor:any;

  ValorActivo: any

  constructor(
    private formbuilder: FormBuilder,
    private serviciosService: ServiciosService,
    private prestadorService: PrestadorServiceService,
    private categoriaService: CategoriasService,
    private elementRef: ElementRef,
    public dialog: MatDialog,


  ) {
    this.serviciosForm = this.formbuilder.group({
      Nombre: ['', Validators.required],
      Imagen: ['', Validators.required],
      Obligatorio: ['', Validators.required],
      Adicionales: ['', Validators.required],
      valor: [0, Validators.required],
      Cod_prestador_servicio: [0, Validators.required],
      Cod_categoria: [0, Validators.required],
      Sn_cotizar: ["", Validators.required],
      Descripcion: ['', Validators.required]
    });
  }



  openDialog(imagenUrl: string): void {
    const dialogRef = this.dialog.open(AdmiModelServiciosComponent, {
      width: '30%', height: "55%", // ajusta el ancho del modal según tus necesidades
      data: {
        imagenUrl: imagenUrl // Pasar la URL de la imagen al modal
      }
    });
  }

  ngOnInit(): void {


    this.serviciosService.getAllServicio().subscribe((data) => {
      console.log(data);
      this.resultadosServicios = data;
    });

    this.prestadorService.getAllPrestadorServicio().subscribe((data) => {
      console.log(data);
      this.idPrestador = data;

      this.PrestadorActivo = this.idPrestador.filter((presta: any) => presta.Estado === 1)
    })


    this.categoriaService.getAllCategoria().subscribe((data) => {
      console.log(data);
      this.idCategoria = data;

      this.CategoriaActiva = this.idCategoria.filter((cate: any) => cate.Estado === 1)
    })

  }




  enviarDatos() {
    if (this.serviciosForm.valid) {
      const addServicio = {
        Nombre: this.serviciosForm.value.Nombre,
        Imagen: this.imagenUrl, // Asegúrate de que la imagen no exceda el tamaño permitido
        Obligatorio: this.serviciosForm.value.Obligatorio === 'Si' ? 1 : 0,
        Adicionales: this.serviciosForm.value.Adicionales === 'Si' ? 1 : 0,
        valor: this.serviciosForm.value.valor,
        Cod_prestador_servicio: this.serviciosForm.value.Cod_prestador_servicio,
        Cod_categoria: this.serviciosForm.value.Cod_categoria,
        Sn_cotizar: this.serviciosForm.value.Sn_cotizar === 'Si' ? 1 : 0,
        Descripcion: this.serviciosForm.value.Descripcion,
      };

      console.log('Datos a enviar:', addServicio);

      // Realizar la solicitud y manejar la respuesta
      this.serviciosService.addServicio(addServicio).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.resultadosServicios.push(response);
          this.resetForm();

          // Mostrar el mensaje correspondiente dependiendo de Sn_cotizar
          Swal.fire({
            text: addServicio.Sn_cotizar === 1 ? "Se guardó exitosamente En Cotización" : "Se guardó exitosamente en Qué Ofrecemos",
            icon: "success"
          });
        },
        error: (error) => {
          console.error('Error al guardar el servicio:', error);
          Swal.fire({
            text: "Hubo un error al guardar el servicio.",
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



  enviarImg(event: any) {
    const file = event.target.files[0];

    // Verifica el tamaño del archivo antes de convertirlo
    if (file.size > 50 * 1024 * 1024) { // 50 MB
      alert('El archivo es demasiado grande');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result as string;
      this.imagenUrl = base64Image;
      // Ahora puedes enviar `imagenBase64` en tu solicitud POST
    };

    reader.readAsDataURL(file);
  }



  eliminarServicio(codServicio: any): void {
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
        this.serviciosService.deleteServicio(codServicio).subscribe({
          next: (response) => {
            if (response.message === 'Servicio eliminado correctamente') {
              // Elimina el proveedor del arreglo local para actualizar la tabla
              this.resultadosServicios = this.resultadosServicios.filter((item: any) => item.Cod_servicio !== codServicio);

              // Mensaje de éxito
              Swal.fire({
                title: 'Borrado!',
                text: response.message,
                icon: 'success'
              });
            } else {
              // Mensaje de error cuando el proveedor está asociado
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
              text: 'No se puede eliminar el proveedor porque está asociado con uno o más menajes.',
              icon: 'error'
            });
          }
        });
      }
    });
  }


  editarServicio(edit: any, index: number): void {
    this.editingIndex = edit.Cod_servicio;
    this.imagenUrl = edit.Imagen
    this.botonEditar = true
    this.serviciosForm = this.formbuilder.group({
      Nombre: [edit.Nombre],
       // imagen: [edit?.imgFile],
      Adicionales: [edit.Adicionales  ? 'Si' : 'No'],
      Obligatorio: [edit.Obligatorio  ? 'Si' : 'No'],
      valor: [edit.valor],
      Cod_prestador_servicio: [edit.Cod_prestador_servicio],
      Cod_categoria: [edit.Cod_categoria],
      Sn_cotizar: [edit.Sn_cotizar  ? 'Si' : 'No'],
      Descripcion: [edit.Descripcion]
    })

  }



  // Método para guardar los cambios en un registro editado
  editarDatos() {
    if (this.editingIndex !== null) {
      const editServicio = {
        Nombre: this.serviciosForm.value.Nombre,
        Imagen: this.imagenUrl, // Incluir la imagen en base64
        Adicionales: this.serviciosForm.value.Adicionales === 'Si' ? 1 : 0,
        Obligatorio: this.serviciosForm.value.Obligatorio === 'Si' ? 1 : 0,
        valor: this.serviciosForm.value.valor,
        Cod_prestador_servicio: this.serviciosForm.value.Cod_prestador_servicio,
        Cod_categoria: this.serviciosForm.value.Cod_categoria,
        Sn_cotizar: this.serviciosForm.value.Sn_cotizar === 'Si' ? 1 : 0,
        Descripcion: this.serviciosForm.value.Descripcion,
      };

      this.serviciosService.editServicio(this.editingIndex, editServicio).subscribe(
        () => {
          this.serviciosService.getAllServicio().subscribe(data => {
            this.resultadosServicios = data;
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
    this.imagenUrl = ''
    this.botonEditar = false
    this.serviciosForm.reset();

  }



  cargarServicio(): void {
    this.serviciosService.getAllServicio().subscribe({
      next: (data) => {
        this.resultadosServicios = data;
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

  cambiarEstado(codServicio: number, nuevoEstado: number): void {
    this.serviciosService.cambiarEstadoServicio(codServicio, nuevoEstado).subscribe({
      next: () => {
        // Actualiza La Promocion localmente o vuelve a cargar los promocion
        this.cargarServicio(); // Suponiendo que tienes un método para recargar los promocion
        Swal.fire({
          title: "Éxito",
          text: `El Servicio ha sido ${nuevoEstado === 1 ? 'activado' : 'desactivado'} correctamente.`,
          icon: "success"
        });
      },
      error: (err) => {
        console.error('Error al cambiar La estado:', err);
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar La estado del Promocion.",
          icon: "error"
        });
      }
    });
  }

}
