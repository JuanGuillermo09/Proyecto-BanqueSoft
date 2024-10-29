import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { SectionComponent } from "../shared/section/section.component";
import { ServiciosComponent } from "../shared/servicios/servicios.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { GaleriaComponent } from "../shared/galeria/galeria.component";
import { SharedComponent } from "../shared/shared.component";
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-pages',
    standalone: true,
    templateUrl: './pages.component.html',
    imports: [SideBarComponent, RouterModule, SectionComponent, ServiciosComponent, FooterComponent, GaleriaComponent, SharedComponent,MatIconModule]
})
export class PagesComponent {

  

}
