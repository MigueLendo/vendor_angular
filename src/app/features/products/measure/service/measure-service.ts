import { Injectable } from '@angular/core';
import { BaseSave } from '../../../../shared/components/service/base-save';
import { measureModel } from '../interface/interface';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class measureService extends BaseSave<measureModel> {

  override endpoint = "medidas";

  override search(): Observable<measureModel[]> {
    return super.search().pipe(
      map((response: any) => {
        console.log(response)
        const data = response.data;

        return data.map((value: any) => {
          return {
            id: value.id,
            nome: value.nome
          }
        })
      })
    )
  }
}
