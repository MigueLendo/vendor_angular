export interface TableColumn<T> {
  key: keyof T;
  label: string;
}

export interface TableAction<T> {
  label: string;
  action: string;
  class?: string;
  icon?: string;
}
