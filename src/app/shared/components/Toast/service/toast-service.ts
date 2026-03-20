import { Injectable, signal } from '@angular/core';
import { IToastInterface } from '../interfaces/toast-interface';

// declaro que posso usar em outros lugares do meu sistema - dia 24/02
@Injectable({
  providedIn: 'root',
})
export class ToastService {

  // signal minha estrutura para gerencias minha tela avisando e mudando assim que for especificado na tela - dia 24/02
  public toasts = signal<IToastInterface[]>(
    [

    ]
  );

  counter = 0

  // então ao mostrar eu terei que especificar a mensagem e o type e o time
  show(msg: string, type: 'danger' | 'success' | 'info', time: number = 3000) {

    let id = this.counter++;

    let toast = { id: id, message: msg, visible: true, type: type, timer: time };


    this.toasts.update((list) => [...list, toast]);


    setTimeout(() => {
      this.hide(id);
    }, time)

  }

  // para fechar meus toast nas telas - dia 24/02
  hide(id: number) {

    this.toasts.update((list) => list.filter((toast) => toast.id != id))

  }

}
