import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category-service';
import { CategoryModel } from '../interfaces/category-model';
import { Table } from '../../../../shared/components/table/table';
import { TableAction, TableColumn } from '../../../../shared/components/table/table-interface';
import { ToastService } from '../../../../shared/components/Toast/service/toast-service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [Table],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss'
})
export class CategoryList implements OnInit {


  private router = inject(Router);
  private categoryService = inject(CategoryService);
  private toastService = inject(ToastService); 

  dataModel = signal<CategoryModel[]>([]);

  tableColumns: TableColumn<CategoryModel>[] = [
    { label: 'Nome', key: 'name' }
  ];

  tableActions: TableAction<CategoryModel>[] = [
    { label: 'Excluir', action: 'edit', class: 'btn-danger', icon: 'bi bi-pencil' },
    { label: 'Editar', action: 'delete', class: 'btn-primary', icon: 'bi bi-trash' }
  ];


  ngOnInit() {
    this.loadData();
  }

  private loadData() {

    this.categoryService.search().subscribe((value) => {

      this.dataModel.set(value)

    })
  }

  handleTableAction(event: { item: CategoryModel, action: string }) {

    if (event.action === 'delete') {
      this.router.navigate(['/category/form', event.item.id]);
    }

    if (event.action === 'edit') {
      this.removerItem(event.item);
    }

  }

  private removerItem(item: CategoryModel) {

    if (item.id) {

      this.categoryService.delete(item.id!).subscribe({
        next: () => {
          this.dataModel.update(lista => lista.filter(x => x.id !== item.id));
          this.toastService.show("Removido com sucesso", 'success', 2500);
          setTimeout(() => this.router.navigate(['/category/list']), 2000);

        },
        error: (erro) => console.error('Erro ao excluir:', erro)
      });
    }
  }

  onRegister() {

    this.toastService.show("Voltando para o formulário", 'info', 2000);
    setTimeout(() => this.router.navigate(['/category/form']), 2000);
  }

}