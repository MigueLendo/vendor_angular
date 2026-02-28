import { Component, signal } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';
import { InterfacesNavbar } from './shared/components/navbar/interfaces/interfaces-navbar';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./shared/components/Toast/toast-component";

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, ToastComponent],
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
          routes: "/category",
          children: []
        },
        {
          name: "colors",
          routes: "/category",
          children: []
        }
      ]
    }
  ]

}
