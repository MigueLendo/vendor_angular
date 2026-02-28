import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableAction, TableColumn } from './table-interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table<T = any> {

  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() actions: TableAction<T>[] = [];

  @Output() actionClick = new EventEmitter<{
    item: T;
    action: string;
  }>();

  onAction(item: T, action: string) {
    this.actionClick.emit({ item, action });
  }

}
