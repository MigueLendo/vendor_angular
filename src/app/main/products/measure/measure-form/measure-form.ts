import { Component, inject } from '@angular/core';
import { BaseForm } from '../../../../shared/class/base-form';
import { measureModel } from '../interface/interface';
import { Field, minLength, required } from "@angular/forms/signals";
import { ToastService } from '../../../../shared/components/Toast/service/toast-service';
import { ActivatedRoute, Router } from '@angular/router';
import { measureService } from '../service/measure-service';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-measure-form',
  imports: [Field],
  templateUrl: './measure-form.html',
  styleUrl: './measure-form.scss',
})
export class MeasureForm extends BaseForm<measureModel> {
  measureservice = inject(measureService)
  router = inject(Router)
  route = inject(ActivatedRoute);

  private serviceToast = inject(ToastService)

  constructor() {
    super();

    this.createform(
      this.createModel({
        id: '',
        name: ""
      }, this.route),
      (Path) => {
        required(Path.name, { message: " O campo é obrigatório " });
        minLength(Path.name, 3, { message: "O Mínimo é 3 letras" })
      }
    );

  }

  createModel(model: measureModel, route: ActivatedRoute) {

    const routedata = toSignal(route.data);

    const data = routedata()?.["data"];

    if (data) {
      return data as measureModel
    }
    else {
      return model
    }

  }

  override onSave(): void {

    const mensagem = this.model().id ? 'Medida alterada com sucesso!' : 'Medida cadastrada com sucesso!'

    this.measureservice.save(this.model(), this.model().id).subscribe({

      next: () => {
        this.serviceToast.show(mensagem, 'success', 2000)
        setTimeout(() => this.router.navigate(['/measure/list']), 1900)

      },
      error: () => this.serviceToast.show('Erro ao salvar!', 'danger', 2000)
    });
  }

  onBack(): any {

    this.serviceToast.show('Voltando para a lista!', 'info', 1500)
    setTimeout(() => this.router.navigate(['/measure/list']), 1500)
  }
}

