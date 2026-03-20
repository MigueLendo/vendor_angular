import { Component, signal } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { InterfacesNavbar } from './shared/components/navbar/interfaces/interfaces-navbar';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./toast-component/toast-component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('vendor_angular');

  InterfacesNavbar: InterfacesNavbar[] = [
    {
      name: "produtos",
      routes: "#",
      children: [
        {
          name: "category",
          routes: "/category/form",
          children: []
        },
        {
          name: "measure",
          routes: "/measure/form",
          children: []
        },
        {
          name: "grupo",
          routes: "/group/form",
          children: []
        }
      ]
    }
  ]

}
