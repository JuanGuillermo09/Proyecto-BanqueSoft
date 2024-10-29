import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { ProveedoresService } from '../../services/proveedores/proveedores.service';
import { MenajeService } from './../../services/menaje/menaje.service';

@Component({
  selector: 'app-admi.menaje',
  standalone: true,
  imports: [MatIcon, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './admi.menaje.component.html',
  styleUrl: './admi.menaje.component.css',
  providers: [MenajeService, ProveedoresService],
})
export class AdmiMenajeComponent implements OnInit {

  formMenaje: FormGroup;

  resultadoMenaje: any

  ProveedorActivo: any

  IdProveedor: any

  editingIndex: any;

  botonEditar: boolean = false


  constructor(private formBuilder: FormBuilder, private menajeService: MenajeService, private proveedorespervice: ProveedoresService) {

    this.formMenaje = this.formBuilder.group({
      Nombre_Menaje: ["", Validators.required],
      Cantidad: [0, Validators.required],
      Cod_Proveedor: [0, Validators.required],
      Descripcion: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.menajeService.getAllMenaje().subscribe((data) => {
      console.log(data);
      this.resultadoMenaje = data;

    });

    this.proveedorespervice.getAllProveedores().subscribe((data) => {
      console.log(data);
      this.IdProveedor = data;

      this.ProveedorActivo = this.IdProveedor.filter((prove: any) => prove.Estado === 1)
    })
  }

  enviarDatos() {
    if (this.formMenaje.valid) {
      const addMenaje = {
        Nombre_Menaje: this.formMenaje.value.Nombre_Menaje,
        Cantidad: this.formMenaje.value.Cantidad,
        Cod_Proveedor: this.formMenaje.value.Cod_Proveedor,
        Descripcion: this.formMenaje.value.Descripcion,
      };

      console.log('Datos a enviar:', addMenaje);

      this.menajeService.addMenaje(addMenaje).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.resultadoMenaje.push(response);
          this.formMenaje.reset();
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

  eliminarMenaje(codMenaje: any): void {
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
        this.menajeService.deleteMenaje(codMenaje).subscribe({
          next: () => {
            // Filtra el array para eliminar el registro con el ID dado
            this.resultadoMenaje = this.resultadoMenaje.filter((item: any) => item.Cod_Menaje !== codMenaje);
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
              text: "No se puede eliminar el Menaje porque está asociado con uno o más Contratos.",
              icon: "error"
            });
          }
        });
      }
    });
  }





  // Método para iniciar la edición de un registro
  editarMenaje(edit: any, index: number): void {
    this.editingIndex = edit.Cod_Menaje;
    this.botonEditar = true;
    this.formMenaje = this.formBuilder.group({
      Nombre_Menaje: [edit.Nombre_Menaje],
      Cantidad: [edit.Cantidad],
      Cod_Proveedor: [edit.Cod_Proveedor],
      Descripcion: [edit.Descripcion]
    });
  }


  // Método para guardar los cambios en un registro editado
  editarDatos() {
    if (this.editingIndex !== null) {
      const editMenaje = {
        Nombre_Menaje: this.formMenaje.value.Nombre_Menaje,
        Cantidad: this.formMenaje.value.Cantidad,
        Cod_Proveedor: this.formMenaje.value.Cod_Proveedor,
        Descripcion: this.formMenaje.value.Descripcion
      };

      this.menajeService.editMenaje(this.editingIndex, editMenaje).subscribe(
        () => {
          this.menajeService.getAllMenaje().subscribe(data => {
            this.resultadoMenaje = data;
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
    this.formMenaje.reset();
  }


  // Método para cargar los menajes desde el backend
  cargarMenajes(): void {
    this.menajeService.getAllMenaje().subscribe({
      next: (data) => {
        this.resultadoMenaje = data;
      },
      error: (err) => {
        console.error('Error al cargar menajes:', err);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al cargar los menajes.",
          icon: "error"
        });
      }
    });
  }

  // Método para cambiar el estado de un menaje
  cambiarEstadoMenaje(menajeId: number, estadoNuevo: number): void {
    this.menajeService.cambiarEstadoMenaje(menajeId, estadoNuevo).subscribe({
      next: () => {
        // Actualiza localmente el estado del menaje
        const index = this.resultadoMenaje.findIndex((menaje: any) => menaje.Cod_Menaje === menajeId);
        if (index !== -1) {
          this.resultadoMenaje[index].Estado = estadoNuevo;
        }

        Swal.fire({
          title: "Éxito",
          text: `El menaje ha sido ${estadoNuevo === 1 ? 'activado' : 'desactivado'} correctamente.`,
          icon: "success"
        });
      },
      error: (err) => {
        console.error('Error al cambiar el estado:', err);
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar el estado del menaje.",
          icon: "error"
        });
      }
    });
  }
}
