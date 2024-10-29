import { Component } from '@angular/core';
import { CitaComponent } from "../../../auth/cita/cita.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admi-cita',
  standalone: true,
  imports: [CitaComponent, RouterModule],
  templateUrl: './admi-cita.component.html',
  styleUrl: './admi-cita.component.css'
})
export class AdmiCitaComponent {

}
