import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { TipoDeEventoService } from '../../services/tipo-de-evento/tipo-de-evento.service';

@Component({
  selector: 'app-admi-tipo-de-evento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIcon, HttpClientModule],
  templateUrl: './admi-tipo-de-evento.component.html',
  styleUrl: './admi-tipo-de-evento.component.css',
  providers: [TipoDeEventoService],
})
export class AdmiTipoDeEventoComponent implements OnInit {

  resultadoTipo: any;

  FormTipoDeEvento: FormGroup;

  editingIndex: any;

  botonEditar: boolean = false



  constructor(private formBuilder: FormBuilder, private tipodeeventoservice: TipoDeEventoService) {


    this.FormTipoDeEvento = this.formBuilder.group({
      Nombre: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.tipodeeventoservice.getAllTipoDeEvento().subscribe((data) => {
      console.log(data);
      this.resultadoTipo = data;

    });
  }



  enviarDatos() {
    if (this.FormTipoDeEvento.valid) {
      const TipoDeEvento = {
        Nombre: this.FormTipoDeEvento.value.Nombre,

      };
      console.log('Datos a enviar:', TipoDeEvento);
      this.tipodeeventoservice.addTipoDeEvento(TipoDeEvento).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.resultadoTipo.push(response);
          this.FormTipoDeEvento.reset();
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
  eliminarTipoDeEvento(codTipoDeEvento: any): void {
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
        this.tipodeeventoservice.deleteTipoDeEvento(codTipoDeEvento).subscribe({
          next: () => {
            // Filtra el array para eliminar el registro con el ID dado
            this.resultadoTipo = this.resultadoTipo.filter((item: any) => item.Cod_tipo_evento !== codTipoDeEvento);
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
              text: "No se puede eliminar el Tipo de evento porque está asociado con uno o más Contratos.",
              icon: "error"
            });
          }
        });
      }
    });
  }

  // Método para iniciar la edición de un registro
  editarTipoEvento(edit: any, index: number): void {
    this.editingIndex = edit.Cod_tipo_evento;
    this.botonEditar = true;
    this.FormTipoDeEvento = this.formBuilder.group({
      Nombre: [edit.Nombre],

    });
  }

  // Método para guardar los cambios en un registro editado
  editarDatos() {
    if (this.editingIndex !== null) {
      const editaTipoEvento = {
        Nombre: this.FormTipoDeEvento.value.Nombre,

      };

      this.tipodeeventoservice.editTipoDeEvento(this.editingIndex, editaTipoEvento).subscribe(
        () => {
          this.tipodeeventoservice.getAllTipoDeEvento().subscribe(data => {
            this.resultadoTipo = data;
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
    this.FormTipoDeEvento.reset();
  }


  // Método para cargar los TipoDeEvento desde el backend
  cargarTipoDeEvento(): void {
    this.tipodeeventoservice.getAllTipoDeEvento().subscribe({
      next: (data) => {
        this.resultadoTipo = data;
      },
      error: (err) => {
        console.error('Error al cargar TipoDeEvento:', err);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al cargar los TipoDeEvento.",
          icon: "error"
        });
      }
    });
  }


  // Método para cambiar el estado de un TipoDeEvento
  cambiarEstadoCategoria(TipoDeEventoId: number, estadoNuevo: number): void {
    this.tipodeeventoservice.cambiarEstadoTipoDeEvento(TipoDeEventoId, estadoNuevo).subscribe({
      next: () => {
        // Actualiza localmente el estado del TipoDeEvento
        const index = this.resultadoTipo.findIndex((TipoDeEvento: any) => TipoDeEvento.Cod_tipo_evento === TipoDeEventoId);
        if (index !== -1) {
          this.resultadoTipo[index].Estado = estadoNuevo;
        }

        Swal.fire({
          title: "Éxito",
          text: `EL Tipo De Evento ha sido ${estadoNuevo === 1 ? 'activado' : 'desactivado'} correctamente.`,
          icon: "success"
        });
      },
      error: (err) => {
        console.error('Error al cambiar el estado:', err);
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar el estado del TipoDeEvento.",
          icon: "error"
        });
      }
    });
  }

}


