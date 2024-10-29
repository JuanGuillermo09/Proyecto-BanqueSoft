import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [RouterModule, SideBarComponent],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {

}
