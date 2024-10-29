import { Component, ElementRef, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AdmiModalNotificacionComponent } from './admi-modal-notificacion/admi-modal-notificacion.component';


@Component({
  selector: 'app-admi-navbar',
  standalone: true,
  imports: [MatIconModule, MatMenuModule,RouterModule, CommonModule],
  templateUrl: './admi-navbar.component.html',
  styleUrl: './admi-navbar.component.css',
  providers: [AuthService],
})
export class AdmiNavbarComponent implements OnInit {


  nombre: any;

  constructor(
    private elementRef: ElementRef,
     public dialog: MatDialog,
      private authService: AuthService, ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdmiModalNotificacionComponent, {
      width: '35%', height:"75%", // ajusta el ancho del modal según tus necesidades
    });
  }

  logout() {
    this.authService.logout(); // Llama al método de cierre de sesión
  }

  ngOnInit(): void {
    // Obtener el nombre del administrador del localStorage
    this.nombre = localStorage.getItem('adminName');
  }
}
