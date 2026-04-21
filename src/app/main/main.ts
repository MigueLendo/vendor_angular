import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
