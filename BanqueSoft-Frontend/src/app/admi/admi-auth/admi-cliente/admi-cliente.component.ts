import { Component } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegistroComponent } from "../../../auth/registro/registro.component";

@Component({
  selector: 'app-admi-cliente',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RegistroComponent],
  templateUrl: './admi-cliente.component.html',
  styleUrl: './admi-cliente.component.css',
  providers:[ClienteService]
})
export class AdmiClienteComponent {


  resultadoCliente: any;



  botonEditar: boolean = false


  constructor( private formBuilder: FormBuilder, private ClienteService: ClienteService){}

  ngOnInit(): void {
    this.ClienteService.getAllCliente().subscribe((data) => {
      this.resultadoCliente = data;
    })
  }


}
