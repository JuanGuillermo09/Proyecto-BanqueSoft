
import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';




@Component({
    selector: 'app-side-bar',
    standalone: true,
    templateUrl: './side-bar.component.html',
    styleUrls: ["./side-Bar.component.css"],
    imports: [RouterModule,MatIconModule]
})
export class SideBarComponent {
}

