import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { ClienteService } from '../../services/cliente/cliente.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIcon, HttpClientModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers:[ClienteService]
})
export class RegistroComponent implements OnInit {

  FormCliente: FormGroup;

  resultadoCliente: any;

  editingIndex: any;

  botonEditar: boolean = false

  showPassword: boolean = false; // Controla la visibilidad de la contraseña


  constructor(private formBuilder: FormBuilder, private ClienteService: ClienteService) {


    this.FormCliente = this.formBuilder.group({

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
    this.ClienteService.getAllCliente().subscribe((data) => {
      this.resultadoCliente = data;
    })
  }

  enviarDatos() {
    if (this.FormCliente.valid) {
      // Verificar si las contraseñas coinciden antes de enviar
      if (this.FormCliente.errors && this.FormCliente.errors['notMatching']) {
        Swal.fire({
          title: "Error",
          text: "Las contraseñas no coinciden. Por favor, verifica.",
          icon: "error"
        });
        return; // Salir si las contraseñas no coinciden
      }

      const addCliente = {
        Tipo_documento: this.FormCliente.value.Tipo_documento,
        Identificacion: this.FormCliente.value.Identificacion,
        Nombre: this.FormCliente.value.Nombre,
        Apellidos: this.FormCliente.value.Apellidos,
        Genero: this.FormCliente.value.Genero,
        Telefono: this.FormCliente.value.Telefono,
        Direccion: this.FormCliente.value.Direccion,
        Email: this.FormCliente.value.Email,
        Contrasenia: this.FormCliente.value.Contrasenia,
        Encriptado: this.FormCliente.value.Encriptado,
      };

      console.log('Datos a enviar:', addCliente);

      this.ClienteService.addCliente(addCliente).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.resultadoCliente.push(response);
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





  eliminarCliente(codCliente: any): void {
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
        this.ClienteService.deleteCliente(codCliente).subscribe({
          next: (response) => {
            if (response.message === 'Cliente  eliminado correctamente') {
              // Elimina el proveedor del arreglo local para actualizar la tabla
              this.resultadoCliente = this.resultadoCliente.filter((item: any) => item.Cod_cliente !== codCliente);


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
              text: 'No se puede eliminar el Cliente  porque está asociado con uno o más Contratos.',
              icon: 'error'
            });
          }
        });
      }
    });
  }




  resetForm() {
    this.editingIndex = 0;
    this.botonEditar = false
    this.FormCliente.reset();
  }







}
