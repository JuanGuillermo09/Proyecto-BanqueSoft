import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-admi-modal-promociones',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, HttpClientModule],
  templateUrl: './admi-modal-promociones.component.html',
  styleUrl: './admi-modal-promociones.component.css',

})
export class AdmiModalPromocionesComponent {


  imagenUrl: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.imagenUrl = data.imagenUrl;
    
  }

}
