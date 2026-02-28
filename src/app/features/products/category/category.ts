import { Component, inject } from '@angular/core';
import { CategoryModel } from './interfaces/category-model';
import { Field, required, minLength, submit, FieldTree } from '@angular/forms/signals';
import { BaseForm } from '../../../shared/class/base-form';
import { CategoryService } from './service/category-service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastService } from '../../../shared/components/Toast/interfaces/toast-config';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [Field],
  templateUrl: './category.html',
  styleUrl: './category.scss'
})

export class Category extends BaseForm<CategoryModel> {
  categoryService = inject(CategoryService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  routeData = toSignal(this.route.data);
  contactForm: any;
  submit: any;

  constructor() {
    super();

    this.createform(
      this.createModel({
        id: null,
        name: ""
      }, this.route),
      (Path) => {
        required(Path.name, { message: "O Campo é obrigatório" });
        minLength(Path.name, 3, { message: "O Minimo é 3 letras" });
      }
    );

  }

  createModel(model: CategoryModel, route: ActivatedRoute) {

    const routeData = toSignal(route.data);

    const data = routeData()?.["data"];

    if (data) {
      return data as CategoryModel
    }
    else {
      return model
    }

  }

  override onSave(): void {

    const mensagem = this.model().id ? 'Categoria atualizada com sucesso!' : 'Categoria criada com sucesso!';

    this.categoryService.save(this.model(), this.model().id).subscribe({
      next: () => {
        this.toastService.show(mensagem, 'success', 2500);
        setTimeout(() => this.router.navigate(['/category/list']), 2500);
      },
      error: () => this.toastService.show('Erro ao salvar!', 'danger', 2000)
    });
  }
  

  onBack(): any {

    this.toastService.show('Voltando para a lista', 'info', 1500);
    setTimeout(() => this.router.navigate(['/category/list']), 1300);
  }


  private toastService = inject(ToastService);
}