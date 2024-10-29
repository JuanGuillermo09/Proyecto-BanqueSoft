import { Routes } from '@angular/router';
// import { AdmiCitaComponent } from './admi-pages/admi-cita/admi-cita.component';
import { AdmiPagesComponent } from './admi-pages/admi-pages.component';
import { AdmiPromocionesComponent } from './admi-pages/admi-promociones/admi-promociones.component';
import { AdmiMenajeComponent } from './admi-pages/admi.menaje/admi.menaje.component';



import { AdmiContratoComponent } from './admi-pages/admi-contrato/admi-contrato.component';
import { AdmiProveedorComponent } from './admi-pages/admi-proveedor/admi-proveedor.component';
import { AdmiServiciosComponent } from './admi-pages/admi-servicios/admi-servicios.component';
import { AdmiSectionComponent } from './admi-shared/admi-section/admi-section.component';
import { AdmiCategoriasComponent } from './admi-pages/admi-categorias/admi-categorias.component';
import { AdmiTipoDeEventoComponent } from './admi-pages/admi-tipo-de-evento/admi-tipo-de-evento.component';
import { AdmiAniadirAdministradorComponent } from './admi-auth/admi-aniadir-administrador/admi-aniadir-administrador.component';
import { AdmiPrestadorServiciosComponent } from './admi-auth/admi-prestador-servicios/admi-prestador-servicios.component';
import { AdmiClienteComponent } from './admi-auth/admi-cliente/admi-cliente.component';
import { authGuardGuard } from '../Guard/auth-guard.guard';
import { AdmiCitaComponent } from './admi-auth/admi-cita/admi-cita.component';


export const AdmiRoutes: Routes = [



  {
    path: "admi",
    component: AdmiPagesComponent,
    canActivate: [authGuardGuard],
    children:  [

      { path: "inicio", component: AdmiSectionComponent,},
      { path: "mensajes", component: AdmiMenajeComponent },
      { path: "promocion", component: AdmiPromocionesComponent },
      { path: "admi-cita", component: AdmiCitaComponent },
      { path: "servicios", component: AdmiServiciosComponent, },
      { path: "proveedor", component: AdmiProveedorComponent, },
      { path: "contrato", component: AdmiContratoComponent, },
      { path: "categoria", component: AdmiCategoriasComponent,},
      { path: "tipo-de-evento", component: AdmiTipoDeEventoComponent,},
      { path: "aniadir-administrador", component: AdmiAniadirAdministradorComponent,},
      { path: "prestador-service", component: AdmiPrestadorServiciosComponent,},
      { path: "cliente", component: AdmiClienteComponent,},





      { path: "", redirectTo: "inicio", pathMatch: "full" },
      { path: "**", component: AdmiSectionComponent }
    ]
  },



]
