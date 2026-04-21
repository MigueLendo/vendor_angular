import { Component, inject, OnInit, signal } from '@angular/core';
import { TableAction, TableColumn } from '../../../../shared/components/table/table-interface';
import { measureModel } from '../interface/interface';
import { measureService } from '../service/measure-service';
import { Table } from "../../../../shared/components/table/table";
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/components/Toast/service/toast-service';
import { AuthStoreService } from '../../../../shared/components/service/auth-store-service';

@Component({
  selector: 'app-measure-list',
  imports: [Table],
  standalone: true,
  templateUrl: './measure-list.html',
  styleUrl: './measure-list.scss',
})
export class MeasureList implements OnInit {

  private router = inject(Router);
  private measureService = inject(measureService);
  private authStore = inject(AuthStoreService)

  private toastService = inject(ToastService);

  dataModel = signal<measureModel[]>([]);

  tableColumns: TableColumn<measureModel>[] = [
    { label: 'Nome', key: 'name' }
  ];

  tableActions: TableAction<measureModel>[] = [
    { label: 'Editar', action: 'edit', class: 'btn-primary', icon: 'bi bi-pencil' },
    { label: 'Excluir', action: 'delete', class: 'btn-danger', icon: 'bi bi-trash' }
  ];


  ngOnInit() {
    if (this.authStore.token()) {
      this.loadData();
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }

  private loadData() {

    this.measureService.search().subscribe((value) => {

      this.dataModel.set(value)

    })
  }


  handleTableAction(event: { item: measureModel, action: string }) {

    if (event.action === 'edit') {
      this.router.navigate(['/measure/form', + event.item.id]);
    }

    if (event.action === 'delete') {
      this.removerItem(event.item);
    }

  }


  //TODO: trocar o nome do remover para delete ( inglês)
  private removerItem(item: measureModel) {

    if (item.id) {

      this.measureService.delete(item.id!).subscribe({
        next: () => {

          this.dataModel.update(lista => lista.filter(x => x.id !== item.id));
          this.toastService.show("removido com sucesso", 'success', 250);
          setTimeout(() => this.router.navigate(['./measure/list']), 1500)
        },

        error: (erro) => console.error('Erro ao excluir:', erro)
      });
    }
  }

  onRegister() {

    this.toastService.show("Voltando para o formulário", 'info', 2200);
    setTimeout(() => this.router.navigate(['./measure/form']), 2000)
  }

}
