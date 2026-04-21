import { Component, inject, signal } from '@angular/core';
import { ILoginModel } from './interface/login-model';
import { Field, required, minLength } from '@angular/forms/signals';
import { LoginService } from './service/login-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BaseForm } from '../shared/class/base-form';
import { ToastService } from '../shared/components/Toast/service/toast-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Field, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login extends BaseForm<ILoginModel> {

  private loginService = inject(LoginService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  showPassword = signal(false);

  constructor() {

    super();

    this.createform(
      {
        email: "",
        password: ""
      },
      (Path) => {
        required(Path.email, { message: "O e-mail é obrigatório" });
        required(Path.password, { message: "A senha é obrigatória" });
        minLength(Path.password, 6, { message: "Mínimo de 6 letras" });
      }
    );
  }

  override onSave(): void {

    if (!this.formdata.email() || !this.formdata.password()) {
      this.toastService.show('Verifique os campos obrigatórios', 'danger', 3000);
      return;
    }


    this.loginService.login(this.model()).subscribe({
      next: (res: any) => {

        this.toastService.show('Bem-vindo! Login realizado', 'success', 2000);

        this.router.navigate(['/home']);

      },
      error: (error: any) => {
        this.toastService.show('Verifique os campos obrigatórios', 'danger', 3000);
      }
    });
  }
}