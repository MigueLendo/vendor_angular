import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], 
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {}