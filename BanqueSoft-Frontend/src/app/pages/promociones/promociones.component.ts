import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PromocionesService } from '../../services/promociones/promociones.service';
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SideBarComponent],
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css',
  providers: [PromocionesService],

})
export class PromocionesComponent implements OnInit {
  resultadosPromo: any
  promocionesActivas: any
  constructor(private promocionesservice: PromocionesService) {

  }
  ngOnInit(): void {

    this.promocionesservice.getAllPromocion().subscribe((data) => {
      console.log(data);
      // Guardas todas las promociones para la administración
      this.resultadosPromo = data;

      // Filtras solo las promociones activas para el cliente
      this.promocionesActivas = this.resultadosPromo.filter((promo: any) => promo.Estado === 1)
    });
  }

}
