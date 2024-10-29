import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../services/administrador/administrador.service';

@Component({
  selector: 'app-admi-aniadir-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIcon, HttpClientModule],
  templateUrl: './admi-aniadir-administrador.component.html',
  styleUrl: './admi-aniadir-administrador.component.css',
  providers: [AdministradorService]
})
export class AdmiAniadirAdministradorComponent {

  FormAdministrador: FormGroup;

  resultadoAdministrador: any;

  editingIndex: any;

  botonEditar: boolean = false

  showPassword: boolean = false; // Controla la visibilidad de la contraseña


  constructor(private formBuilder: FormBuilder, private administradorService: AdministradorService) {


    this.FormAdministrador = this.formBuilder.group({

      Tipo_documento: ["", Validators.required],
      Identificacion: [0, Validators.required],
      Nombre: ["", Validators.required],
      Apellidos: ["", Validators.required],
      Genero: ["", Validators.required],
      Telefono: [0, Validators.required],
      Direccion: ["", Validators.required],
      Email: ["", Validators.required],
      Contrasenia: ["", Validators.required],
      Encriptado: ["", Validators.required],

    }, { validator: this.passwordMatchValidator });
  }

  // Validador personalizado para confirmar que las contraseñas coincidan
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('Contrasenia')?.value;
    const confirmPassword = formGroup.get('Encriptado')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }
  ngOnInit(): void {
    this.administradorService.getAllAdministrador().subscribe((data) => {
      this.resultadoAdministrador = data;
    })
  }

  enviarDatos() {
    if (this.FormAdministrador.valid) {
      // Verificar si las contraseñas coinciden antes de enviar
      if (this.FormAdministrador.errors && this.FormAdministrador.errors['notMatching']) {
        Swal.fire({
          title: "Error",
          text: "Las contraseñas no coinciden. Por favor, verifica.",
          icon: "error"
        });
        return; // Salir si las contraseñas no coinciden
      }

      const addAdministrador = {
        Tipo_documento: this.FormAdministrador.value.Tipo_documento,
        Identificacion: this.FormAdministrador.value.Identificacion,
        Nombre: this.FormAdministrador.value.Nombre,
        Apellidos: this.FormAdministrador.value.Apellidos,
        Genero: this.FormAdministrador.value.Genero,
        Telefono: this.FormAdministrador.value.Telefono,
        Direccion: this.FormAdministrador.value.Direccion,
        Email: this.FormAdministrador.value.Email,
        Contrasenia: this.FormAdministrador.value.Contrasenia,
        Encriptado: this.FormAdministrador.value.Encriptado,
      };

      console.log('Datos a enviar:', addAdministrador);

      this.administradorService.addAdministrador(addAdministrador).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.resultadoAdministrador.push(response);
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





  eliminarAdministrador(codAdministrador: any): void {
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
        this.administradorService.deleteAdministrador(codAdministrador).subscribe({
          next: (response) => {
            console.log(response);

            if (response.message === 'Administrador eliminado correctamente') {
              // Elimina el proveedor del arreglo local para actualizar la tabla
              this.resultadoAdministrador = this.resultadoAdministrador.filter((item: any) => item.Cod_administrador !== codAdministrador);


              Swal.fire({
                title: 'Borrado!',
                text: response.message,
                icon: 'success'
              });
              this.administradorService.getAllAdministrador().subscribe((data) => {
                this.resultadoAdministrador = data;
              })
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
              text: 'No se puede eliminar el Administrador  porque está asociado con uno o más Contratos.',
              icon: 'error'
            });
          }
        });
      }
    });
  }



  editarAdministrador(edit: any, index: number): void {
    this.editingIndex = edit.Cod_administrador;
    this.botonEditar = true
    this.FormAdministrador = this.formBuilder.group({
      Tipo_documento: [edit.Tipo_documento],
      Identificacion: [edit.Identificacion],
      Nombre: [edit.Nombre],
      Apellidos: [edit.Apellidos],
      Genero: [edit.Genero],
      Telefono: [edit.Telefono],
      Direccion: [edit.Direccion],
      Email: [edit.Email],
      Contrasenia: [edit.Contrasenia],
      Encriptado: [edit.Encriptado],


    })
  }



  // Método para guardar los cambios en un registro editado
  editarDatos() {
    if (this.editingIndex !== null) {
      const editarAdministrador = {
        Tipo_documento: this.FormAdministrador.value.Tipo_documento,
        Identificacion: this.FormAdministrador.value.Identificacion,
        Nombre: this.FormAdministrador.value.Nombre,
        Apellidos: this.FormAdministrador.value.Apellidos,
        Genero: this.FormAdministrador.value.Genero,
        Telefono: this.FormAdministrador.value.Telefono,
        Direccion: this.FormAdministrador.value.Direccion,
        Email: this.FormAdministrador.value.Email,
        Contrasenia: this.FormAdministrador.value.Contrasenia,
        Encriptado: this.FormAdministrador.value.Encriptado

      };

      this.administradorService.editAdministrador(this.editingIndex, editarAdministrador).subscribe(
        () => {
          this.administradorService.getAllAdministrador().subscribe(data => {
            this.resultadoAdministrador = data;
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
    this.FormAdministrador.reset();
  }

  cargarAdministrador(): void {
    this.administradorService.getAllAdministrador().subscribe({
      next: (data) => {
        this.resultadoAdministrador = data;
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

  cambiarEstado(codAdministrador: number, nuevoEstado: number): void {
    this.administradorService.cambiarEstadoAdministrador(codAdministrador, nuevoEstado).subscribe({
      next: () => {
        // Actualiza La Promocion localmente o vuelve a cargar los promocion
        this.cargarAdministrador(); // Suponiendo que tienes un método para recargar los promocion
        Swal.fire({
          title: "Éxito",
          text: `El Administrador  ha sido ${nuevoEstado === 1 ? 'activado' : 'desactivado'} correctamente.`,
          icon: "success"
        });
      },
      error: (err) => {
        console.error('Error al cambiar La estado:', err);
        Swal.fire({
          title: "Error",
          text: "No se pudo cambiar La estado del Administrador .",
          icon: "error"
        });
      }
    });
  }

}
