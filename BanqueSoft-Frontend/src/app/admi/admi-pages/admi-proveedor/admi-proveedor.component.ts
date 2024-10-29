import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { ProveedoresService } from '../../services/proveedores/proveedores.service';


@Component({
  selector: 'app-admi-proveedor',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admi-proveedor.component.html',
  styleUrl: './admi-proveedor.component.css',
  providers: [ProveedoresService]
})
export class AdmiProveedorComponent implements OnInit {

  formProveedor: FormGroup;

  resultadoProveedor: any

  editingIndex: any;

  botonEditar: boolean = false


  constructor(private formBuilder: FormBuilder, private proveedorServicio: ProveedoresService) {

    this.formProveedor = this.formBuilder.group({
      Nombre_representante: ["", Validators.required],
      Nit: ["", Validators.required],
      Telefono: ["", Validators.required],
      Direccion: ["", Validators.required],
      Email: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.proveedorServicio.getAllProveedores().subscribe((data) => {
      this.resultadoProveedor = data;
    })

  }


  enviarDatos() {
    if (this.formProveedor.valid) {
      const addProveedor = {

        Nombre_representante: this.formProveedor.value.Nombre_representante,
        Nit: this.formProveedor.value.Nit,
        Telefono: this.formProveedor.value.Telefono,
        Direccion: this.formProveedor.value.Direccion,
        Email: this.formProveedor.value.Email,

      }
      console.log('Datos a enviar:', addProveedor);
      this.proveedorServicio.addProveedor(addProveedor).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.resultadoProveedor.push(response);
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


  eliminarProveedor(codProveedor: any): void {
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
        this.proveedorServicio.deleteProveedor(codProveedor).subscribe({
          next: (response) => {
            if (response.message === 'Proveedor eliminado correctamente') {
              // Elimina el proveedor del arreglo local para actualizar la tabla
              this.resultadoProveedor = this.resultadoProveedor.filter((item: any) => item.Cod_proveedor !== codProveedor);

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
              text: 'No se puede eliminar el proveedor porque está asociado con uno o más menajes.',
              icon: 'error'
            });
          }
        });
      }
    });
  }


  editarProveedor(edit: any, index: number): void {
    this.editingIndex = edit.Cod_proveedor;
    this.botonEditar = true
    this.formProveedor = this.formBuilder.group({
      Nombre_representante: [edit.Nombre_representante],
      Nit: [edit.Nit],
      Telefono: [edit.Telefono],
      Direccion: [edit.Direccion],
      Email: [edit.Email],
    })
  }

  editarDatos() {
    if (this.editingIndex !== null) {
      const editProveedor = {

        Nombre_representante: this.formProveedor.value.Nombre_representante,
        Nit: this.formProveedor.value.Nit,
        Telefono: this.formProveedor.value.Telefono,
        Direccion: this.formProveedor.value.Direccion,
        Email: this.formProveedor.value.Email,
      };

      this.proveedorServicio.editProveedor(this.editingIndex, editProveedor).subscribe(
        () => {
          this.proveedorServicio.getAllProveedores().subscribe(data => {
            this.resultadoProveedor = data;
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
    this.formProveedor.reset();
  }


  cargarProveedores(): void {
    this.proveedorServicio.getAllProveedores().subscribe({
      next: (data) => {
        this.resultadoProveedor = data;
      },
      error: (err) => {
        console.error('Error al cargar proveedores:', err);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al cargar los proveedores.",
          icon: "error"
        });
      }
    });
  }


  cambiarEstado(codProveedor: number, nuevoEstado: number): void {
    this.proveedorServicio.cambiarEstadoProveedor(codProveedor, nuevoEstado).subscribe({
      next: () => {
        // Actualiza el proveedor localmente o vuelve a cargar los proveedores
        this.cargarProveedores(); // Suponiendo que tienes un método para recargar los proveedores
        Swal.fire({
          title: "Éxito",
          text: `El proveedor ha sido ${nuevoEstado === 1 ? 'activado' : 'desactivado'} correctamente.`,
          icon: "success"
        });
      },
      error: (err) => {
        console.error('Error al cambiar el estado:', err);
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar el estado del proveedor.",
          icon: "error"
        });
      }
    });
  }

}
