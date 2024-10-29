import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, MatIcon,CommonModule]
})
export class AppComponent  {
  title = 'BanqueSoft';


  showScroll: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Muestra el botón cuando se haya desplazado más de 300px desde la parte superior
    this.showScroll = window.pageYOffset > 100;
  }

  // Método para desplazarse hacia arriba
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
