
import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CitasService } from '../../../../services/citas/citas.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admi-modal-notificacion',
  standalone: true,
  imports: [MatDialogModule,MatIconModule,HttpClientModule, CommonModule, RouterModule],
  templateUrl: './admi-modal-notificacion.component.html',
  styleUrl: './admi-modal-notificacion.component.css',
  providers: [ CitasService],
})
export class AdmiModalNotificacionComponent implements OnInit {


  notificaciones: any;

  constructor(  private citaService: CitasService,){}




  ngOnInit(): void {
    this.citaService.getAllCita().subscribe((data) => {
      console.log(data);
      this.notificaciones = data;

    });
}

}
