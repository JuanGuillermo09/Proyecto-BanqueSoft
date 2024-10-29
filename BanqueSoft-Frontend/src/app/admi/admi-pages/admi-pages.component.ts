import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdmiSideBarComponent } from '../admi-shared/admi-side-bar/admi-side-bar.component';
import { AdmiNavbarComponent } from "../admi-shared/admi-navbar/admi-navbar.component";
import { HttpClientModule } from '@angular/common/http';
import { authGuardGuard } from '../../Guard/auth-guard.guard';


@Component({
  selector: 'app-admi-pages',
  standalone: true,
  imports: [
    AdmiSideBarComponent,
    RouterModule,
    AdmiNavbarComponent,
    HttpClientModule
],
  templateUrl: './admi-pages.component.html',
  // providers: [ authGuardGuard],


})
export class AdmiPagesComponent implements OnInit {


  ngOnInit(): void {
    // Deshabilitar el botón de retroceso en el navegador
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  }
}
