import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject,  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-admi-model-contrato',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, HttpClientModule,CommonModule],
  templateUrl: './admi-model-contrato.component.html',
  styleUrl: './admi-model-contrato.component.css',

})
export class AdmiModelContratoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private dialogRef: MatDialogRef<AdmiModelContratoComponent>
  ) {}

  seleccionarCliente(cliente: any): void {
    this.dialogRef.close(cliente); // Cierra el modal y pasa el cliente seleccionado
  }

}
