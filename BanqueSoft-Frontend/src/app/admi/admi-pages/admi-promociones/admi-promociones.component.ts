import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { PromocionesService } from '../../../services/promociones/promociones.service';
import { AdmiModalPromocionesComponent } from './admi-modal-promociones/admi-modal-promociones.component';

@Component({
  selector: 'app-admi-promociones',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIcon, HttpClientModule],
  templateUrl: './admi-promociones.component.html',
  styleUrl: './admi-promociones.component.css',
  providers: [PromocionesService]
})
export class AdmiPromocionesComponent implements OnInit {

  formPromocion: FormGroup;

  imagenUrl: string | ArrayBuffer | null = null;


  resultadosPromo: any


  editingIndex: any;
  botonEditar: boolean = false




  constructor(private formbuilder: FormBuilder,
    private promocionesservice: PromocionesService,
    private elementRef: ElementRef,
    public dialog: MatDialog) {
    this.formPromocion = this.formbuilder.group({
      Fecha_publicacion: ['', Validators.required],
      Imagen: ['', Validators.required],
      Descripcion: ['', Validators.required]
    })
  }


  openDialog(imagenUrl: string): void {
    const dialogRef = this.dialog.open(AdmiModalPromocionesComponent, {
      width: '30%', height: "55%", // ajusta el ancho del modal según tus necesidades
      data: {
        imagenUrl: imagenUrl // Pasar la URL de la imagen al modal
      }
    });
  }
  ngOnInit(): void {
    this.promocionesservice.getAllPromocion().subscribe((data) => {
      console.log(data);
      this.resultadosPromo = data;
    });
  }


  enviarDatos() {
    if (this.formPromocion.valid) {
      const addPromocion = {
        Fecha_publicacion: this.formPromocion.value.Fecha_publicacion,
        Descripcion: this.formPromocion.value.Descripcion,
        Imagen: this.imagenUrl, // Incluir la imagen en base64
      };

      console.log('Datos a enviar:', addPromocion);

      this.promocionesservice.addPromocion(addPromocion).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.resultadosPromo.push(response);
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



  eliminarPromocion(codMenaje: any): void {
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
        this.promocionesservice.deletePromocion(codMenaje).subscribe({
          next: () => {
            // Filtra el array para eliminar el registro con el ID dado
            this.resultadosPromo = this.resultadosPromo.filter((item: any) => item.Cod_Promocion !== codMenaje);
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





  editarPromocion(edit: any, index: number): void {
    this.editingIndex = edit.Cod_Promocion;
    this.imagenUrl = edit.Imagen
    this.botonEditar = true
    this.formPromocion = this.formbuilder.group({
      Fecha_publicacion: [edit.Fecha_publicacion],
      // imagen: [edit?.imgFile],
      Descripcion: [edit.Descripcion]
    })

  }



  // Método para guardar los cambios en un registro editado
  editarDatos() {
    if (this.editingIndex !== null) {
      const editPromocion = {
        Fecha_publicacion: this.formPromocion.value.Fecha_publicacion,
        Imagen: this.imagenUrl, // Incluir la imagen en base64
        Descripcion: this.formPromocion.value.Descripcion
      };

      this.promocionesservice.editPromocion(this.editingIndex, editPromocion).subscribe(
        () => {
          this.promocionesservice.getAllPromocion().subscribe(data => {
            this.resultadosPromo = data;
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
    this.formPromocion.reset();
  }

  cargarPromocion(): void {
    this.promocionesservice.getAllPromocion().subscribe({
      next: (data) => {
        this.resultadosPromo = data;
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


  cambiarEstado(codPromocion: number, nuevoEstado: number): void {
    this.promocionesservice.cambiarEstadoPromocion(codPromocion, nuevoEstado).subscribe({
      next: () => {
        // Actualiza La Promocion localmente o vuelve a cargar los promocion
        this.cargarPromocion(); // Suponiendo que tienes un método para recargar los promocion
        Swal.fire({
          title: "Éxito",
          text: `La Promocion ha sido ${nuevoEstado === 1 ? 'activado' : 'desactivado'} correctamente.`,
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

