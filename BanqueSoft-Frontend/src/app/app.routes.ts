
import { Routes } from '@angular/router';
import { PromocionesComponent } from './pages/promociones/promociones.component';

import { PagesComponent } from './pages/pages.component';

import { IniciarSesionComponent } from './auth/iniciar-sesion/iniciar-sesion.component';
import { RecuperarComponent } from './auth/recuperar/recuperar.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { QueOfrecemosComponent } from './pages/que-ofrecemos/que-ofrecemos.component';
import { GaleriaComponent } from './shared/galeria/galeria.component';

import { CitaComponent } from './auth/cita/cita.component';
import { CambiarComponent } from './auth/recuperar/cambiar/cambiar.component';
import { authGuardGuard } from './Guard/auth-guard.guard';



export const routes: Routes = [


  { path: "cita", component: CitaComponent, canActivate: [authGuardGuard] },
  { path: "iniciarSesion", component: IniciarSesionComponent },
  { path: "registrar", component: RegistroComponent },
  { path: "recuperar", component: RecuperarComponent },

  { path: "inicio", component: PagesComponent },

  { path: "", redirectTo: "inicio", pathMatch: "full" },

  { path: "cotizacion", component: CotizacionComponent },
  { path: "que ofrecemos", component: QueOfrecemosComponent },
  { path: "promociones", component: PromocionesComponent },
  { path: "galeria", component: GaleriaComponent },

  { path: "ayuda", component: AyudaComponent },
  { path: "acerca de", component: AcercaDeComponent },



  { path: 'cambiar-contrasenia/:token', component: CambiarComponent, canActivate: [authGuardGuard] }


];




