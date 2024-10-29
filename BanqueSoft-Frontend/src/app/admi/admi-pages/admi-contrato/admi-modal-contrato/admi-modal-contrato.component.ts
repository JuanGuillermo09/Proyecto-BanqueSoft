import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admi-modal-contrato',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, HttpClientModule,CommonModule],
  templateUrl: './admi-modal-contrato.component.html',
  styleUrl: './admi-modal-contrato.component.css'
})
export class AdmiModalContratoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private dialogRef: MatDialogRef<AdmiModalContratoComponent>
  ) {}

  seleccionarCliente(menaje: any): void {
    this.dialogRef.close(menaje); // Cierra el modal y pasa el cliente seleccionado
  }

}

