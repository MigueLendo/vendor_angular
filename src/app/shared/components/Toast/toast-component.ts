
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ToastService } from "./interfaces/toast-config";

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toast-component.html',
    styleUrl: './toast-component.scss'
})
export class ToastComponent {

    public toastService = inject(ToastService);
}



