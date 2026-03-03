import { Injectable, signal } from '@angular/core';
import { IToastInterface } from '../interfaces/toast-interface';

// declaro que posso usar em outros lugares do meu sistema - dia 24/02
@Injectable({
  providedIn: 'root',
})
export class ToastService {

  // signal minha estrutura para gerencias minha tela avisando e mudando assim que for especificado na tela - dia 24/02
  private toast = signal<IToastInterface>({
    id: 0,
    message: '',
    visible: false,
    type: 'info',
    timer: 0
  });


  // TODO: isActive esta com um nome improprio, pois esta se referindo ao meu toast EX: ToastIsActive
  // deixando somente para leitura para que nenhum outro componente meixa nos toast - dia 24/02
  readonly isActive = this.toast.asReadonly()


  // então ao mostrar eu terei que especificar a mensagem e o type e o time
  show(msg: string, type: 'danger' | 'success' | 'info', time: number) {
    this.toast.set({ id: Math.random(), message: msg, visible: true, type: type, timer: time })

    setTimeout(() => {

      this.hide();
    }, 3000)

  }

  // para fechar meus toast nas telas - dia 24/02
  hide() {
    this.toast.set({ id: 0, message: "", visible: false, type: "danger", timer: 0 })
  }

}
