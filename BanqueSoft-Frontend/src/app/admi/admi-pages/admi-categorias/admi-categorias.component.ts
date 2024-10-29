import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { CategoriasService } from '../../services/categorias/categorias.service';

@Component({
  selector: 'app-admi-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIcon, HttpClientModule],
  templateUrl: './admi-categorias.component.html',
  styleUrl: './admi-categorias.component.css',
  providers: [CategoriasService],
})
export class AdmiCategoriasComponent implements OnInit {


  formCategoria: FormGroup;
  resultadoCatego: any;
  editingIndex: any;

  botonEditar: boolean = false




  constructor(private formBuilder: FormBuilder, private categoriaService: CategoriasService) {


    this.formCategoria = this.formBuilder.group({
      Nombre: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.categoriaService.getAllCategoria().subscribe((data) => {
      console.log(data);
      this.resultadoCatego = data;

    });
  }

  enviarDatos() {
    if (this.formCategoria.valid) {
      const addCategoria = {
        Nombre: this.formCategoria.value.Nombre,

      };
      console.log('Datos a enviar:', addCategoria);
      this.categoriaService.addCategoria(addCategoria).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.resultadoCatego.push(response);
          this.formCategoria.reset();
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



  eliminarCategoria(codCategotia: any): void {
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
        this.categoriaService.deleteCategoria(codCategotia).subscribe({
          next: (response) => {
            if (response.message === 'Categoria eliminado correctamente') {
              // Elimina el proveedor del arreglo local para actualizar la tabla
              this.resultadoCatego = this.resultadoCatego.filter((item: any) => item.Cod_categoria !== codCategotia);

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
              text: 'No se puede eliminar la Categoria porque está asociado con uno o más Servicios.',
              icon: 'error'
            });
          }
        });
      }
    });
  }


  // Método para iniciar la edición de un registro
  editarCategoria(edit: any, index: number): void {
    this.editingIndex = edit.Cod_categoria;
    this.botonEditar = true;
    this.formCategoria = this.formBuilder.group({
      Nombre: [edit.Nombre],

    });
  }


  // Método para guardar los cambios en un registro editado
  editarDatos() {
    if (this.editingIndex !== null) {
      const editCategoria = {
        Nombre: this.formCategoria.value.Nombre,

      };

      this.categoriaService.editCategoria(this.editingIndex, editCategoria).subscribe(
        () => {
          this.categoriaService.getAllCategoria().subscribe(data => {
            this.resultadoCatego = data;
          });

          this.resetForm();

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
    this.formCategoria.reset();
  }

  // Método para cargar los Categoria desde el backend
  cargarCategoria(): void {
    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        this.resultadoCatego = data;
      },
      error: (err) => {
        console.error('Error al cargar Categoria:', err);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al cargar los Categoria.",
          icon: "error"
        });
      }
    });
  }


  // Método para cambiar el estado de un categoria
  cambiarEstadoCategoria(categoriaId: number, estadoNuevo: number): void {
    this.categoriaService.cambiarEstadoCategoria(categoriaId, estadoNuevo).subscribe({
      next: () => {
        // Actualiza localmente el estado del categoria
        const index = this.resultadoCatego.findIndex((categoria: any) => categoria.Cod_categoria === categoriaId);
        if (index !== -1) {
          this.resultadoCatego[index].Estado = estadoNuevo;
        }

        Swal.fire({
          title: "Éxito",
          text: `La categoria ha sido ${estadoNuevo === 1 ? 'activado' : 'desactivado'} correctamente.`,
          icon: "success"
        });
      },
      error: (err) => {
        console.error('Error al cambiar el estado:', err);
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar el estado del categoria.",
          icon: "error"
        });
      }
    });
  }
}
