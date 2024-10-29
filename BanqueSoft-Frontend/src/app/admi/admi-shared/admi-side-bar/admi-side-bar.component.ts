import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admi-side-bar',
  standalone: true,
  imports: [RouterModule, MatIconModule,CommonModule],
  templateUrl: './admi-side-bar.component.html',
  styleUrl: './admi-side-bar.component.css'
})
export class AdmiSideBarComponent  {



}
