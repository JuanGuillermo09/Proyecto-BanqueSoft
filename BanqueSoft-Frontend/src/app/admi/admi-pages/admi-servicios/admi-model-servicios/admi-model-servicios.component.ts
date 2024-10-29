import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admi-model-servicios',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, HttpClientModule],
  templateUrl: './admi-model-servicios.component.html',
  styleUrl: './admi-model-servicios.component.css'
})
export class AdmiModelServiciosComponent {

  imagenUrl: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.imagenUrl = data.imagenUrl;

  }
}
