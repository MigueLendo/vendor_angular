import { Component, inject, signal } from '@angular/core';
import { TableAction, TableColumn } from '../../../../shared/components/table/table-interface';
import { measureModel } from '../interface/interface';
import { measureService } from '../service/measure-service';
import { Table } from "../../../../shared/components/table/table";
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/components/Toast/interfaces/toast-config';

@Component({
  selector: 'app-measure-list',
  imports: [Table],
  templateUrl: './measure-list.html',
  styleUrl: './measure-list.scss',
})
export class MeasureList {
  private router = inject(Router);
  private measureService = inject(measureService);

  dataModel = signal<measureModel[]>([]);

  tableColumns: TableColumn<measureModel>[] = [
    { label: 'Nome', key: 'nome' }
  ];

  tableActions: TableAction<measureModel>[] = [
    { label: 'Editar', action: 'edit', class: 'btn-primary', icon: 'bi bi-pencil' },
    { label: 'Excluir', action: 'delete', class: 'btn-danger', icon: 'bi bi-trash' }
  ];


  ngOnInit() {
    this.loadData();
  }

  private loadData() {

    this.measureService.search().subscribe((value) => {

      this.dataModel.set(value)

    })
  }

  private toastService = inject(ToastService)

  handleTableAction(event: { item: measureModel, action: string }) {

    if (event.action === 'edit') {
      this.router.navigate(['/category/form', event.item.id]);
    }

    if (event.action === 'delete') {
      this.removerItem(event.item);
    }

  }

  private removerItem(item: measureModel) {

    if (item.id) {

      this.measureService.delete(item.id!).subscribe({
        next: () => {

          this.dataModel.update(lista => lista.filter(x => x.id !== item.id));
          this.toastService.show("removido com sucesso", 'danger', 250);
          setTimeout(() => this.router.navigate(['./measure/list']), 1500)
        },

        error: (erro) => console.error('Erro ao excluir:', erro)
      });
    }
  }

  onRegister() {

    this.toastService.show("Voltando para o formulário", 'info', 2500);
    setTimeout(() => this.router.navigate(['./measure/form']), 1000)
  }

}
