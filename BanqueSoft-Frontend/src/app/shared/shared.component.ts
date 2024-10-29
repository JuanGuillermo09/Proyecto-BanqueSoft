import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';

import { SectionComponent } from "../shared/section/section.component";
import { ServiciosComponent } from "../shared/servicios/servicios.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { GaleriaComponent } from "../shared/galeria/galeria.component";
import { AdmiNavbarComponent } from "../admi/admi-shared/admi-navbar/admi-navbar.component";
import { SideBarComponent } from "./side-bar/side-bar.component";



@Component({
    selector: 'app-shared',
    standalone: true,
    templateUrl: './shared.component.html',
    imports: [RouterModule, SectionComponent, ServiciosComponent, FooterComponent, GaleriaComponent, AdmiNavbarComponent, SideBarComponent]
})
export class SharedComponent {


  
}
