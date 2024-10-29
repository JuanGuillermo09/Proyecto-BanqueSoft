import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from "../../shared/side-bar/side-bar.component";

@Component({
  selector: 'app-acerca-de',
  standalone: true,
  imports: [RouterModule, SideBarComponent],
  templateUrl: './acerca-de.component.html',
  styleUrl: './acerca-de.component.css'
})
export class AcercaDeComponent {

}
