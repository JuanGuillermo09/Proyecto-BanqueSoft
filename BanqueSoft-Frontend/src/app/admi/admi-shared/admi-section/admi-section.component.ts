import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admi-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admi-section.component.html',
  styleUrl: './admi-section.component.css'
})
export class AdmiSectionComponent implements OnInit {



  nombre: any
  ngOnInit(): void {
    // Obtener el nombre del administrador del localStorage
    this.nombre = localStorage.getItem('adminName');
  }
}
