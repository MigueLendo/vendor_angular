import { Component, inject, signal } from '@angular/core';
import { InterfacesNavbar } from './shared/components/navbar/interfaces/interfaces-navbar';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast-component/toast-component';
import { AuthStoreService } from './shared/components/service/auth-store-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('vendor_angular');

  authStore = inject(AuthStoreService)

  constructor() {

    this.authStore.loadFromStorage()

  }

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
