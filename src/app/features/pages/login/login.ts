import { Component, inject, signal } from '@angular/core';
import { ILoginModel } from './interface/login-model';
import { Field, required, minLength } from '@angular/forms/signals';
import { BaseForm } from '../../../shared/class/base-form'; // Ajuste o caminho
import { LoginService } from './service/login-service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/components/Toast/service/toast-service';
import { CommonModule } from '@angular/common';

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

  // Signal para o toggle da senha
  showPassword = signal(false);

  constructor() {
    super();

    // Seguindo EXATAMENTE o padrão do seu Category
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
    // 1. Verificação de formulário (use o método valid() do signals form se disponível)
    if (!this.formdata.email() || !this.formdata.password()) {
      this.toastService.show('Verifique os campos obrigatórios', 'danger', 3000);
      return;
    }

    const { email, password } = this.model();
    const auth = `Basic ${btoa(`${email}:${password}`)}`;

    this.loginService.tokenCreate(auth).subscribe({
      next: (res: any) => {
  
        if (res && res !== 'Credencial invalida') {

          localStorage.setItem('token', res);

          this.toastService.show('Bem-vindo! Login realizado', 'success', 2000);

          this.router.navigate(['/category/list']);
        } else {
          this.toastService.show('Senha incorreta', 'danger', 3000);
        }
      }
    });
  }
}