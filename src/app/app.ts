import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStoreService } from './shared/components/service/auth-store-service';
import { ToastComponent } from './shared/components/toast-component/toast-component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ToastComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('vendor_angular');

    authStore = inject(AuthStoreService);

    constructor() {
        this.authStore.loadFromStorage();
    }

    /**ARRUMAR */
    // InterfacesNavbar: InterfacesNavbar[] = [
    //   {
    //     name: "produtos",
    //     routes: "#",
    //     children: [
    //       {
    //         name: "category",
    //         routes: "/category/form",
    //         children: []
    //       },
    //       {
    //         name: "measure",
    //         routes: "/measure/form",
    //         children: []
    //       },
    //       {
    //         name: "grupo",
    //         routes: "/group/form",
    //         children: []
    //       }
    //     ]
    //   }
    // ]
}
