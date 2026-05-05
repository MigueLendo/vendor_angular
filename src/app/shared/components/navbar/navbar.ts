import { Component, input, signal } from '@angular/core';
import { InterfacesNavbar } from './interfaces/interfaces-navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})

export class NavbarComponent {

  itens = input<InterfacesNavbar[]>([
    {
      name: 'Cadastros',
      routes: '',
      children: [
        { name: 'Categorias', routes: '/category/list', children: [] },
        { name: 'Medidas', routes: '/measure/list', children: [] },
        { name: 'Home', routes: '/home', children: [] },
      ]
    }
  ]);
}