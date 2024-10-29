import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";

@Component({
  selector: 'app-que-ofrecemos',
  standalone: true,
  imports: [CommonModule, SideBarComponent, HttpClientModule],
  templateUrl: './que-ofrecemos.component.html',
  styleUrl: './que-ofrecemos.component.css',
  providers: [ServiciosService]
})
export class QueOfrecemosComponent implements OnInit {

  resultadosQueOfrece: any
  QueOfrece: any;
  constructor(private serviciosservice: ServiciosService) {

  }
  ngOnInit(): void {
    this.serviciosservice.getAllServicio().subscribe((data) => {
      console.log('Datos recibidos:', data);

      this.resultadosQueOfrece = data;

      // Agrega un console.log dentro del filtro para ver los valores
      this.QueOfrece = this.resultadosQueOfrece.filter((QueOfre: any) => {
        return QueOfre.Estado === 1 && QueOfre.Sn_cotizar === false;
      });

      console.log('Resultados filtrados:', this.QueOfrece);
    })
  }


}
