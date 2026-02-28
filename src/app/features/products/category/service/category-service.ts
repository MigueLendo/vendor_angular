import { Injectable } from '@angular/core';
import { CategoryModel } from '../interfaces/category-model';
import { BaseSave } from '../../../../shared/components/service/base-save';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseSave<CategoryModel> {

  override endpoint = "categorias"
  open: any;

  override search(): Observable<CategoryModel[]> {
    return super.search().pipe(
      map((response: any) => {
        const data = response.data;

        return data.map((value: any) => {
          return {
            id: value.id,
            name: value.nome
          }
        })
      })
    );
  }


  override searchId(id: string | number): Observable<CategoryModel> {
    return super.searchId(id).pipe(
      map((response: any) => {
        const data = response.data[0];

        return {
          id: data.id,
          name: data.nome
        }
      }))
  }

}



