import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';


export class BaseSave<MODEL> {

    http = inject(HttpClient);
    host = environment.apiUrl;;
    endpoint: string = "";

    save(model: MODEL, id: string | number | null) {

        const endpoint = `${this.host}/${this.endpoint}`;

        let request: Observable<MODEL>;
        if (id) {
            request = this.http.put<MODEL>(`${endpoint}/${id}`, this.mapDTO(model));
        } else {
            request = this.http.post<MODEL>(endpoint, this.mapDTO(model));
        }

        return request

    }

    mapDTO(model: MODEL | any): any {

        return {
            id: model.id,
            nome: model.name
        }

    }

    searchId(id: string | number): Observable<MODEL> {

        const request = `${this.host}/${this.endpoint}/${id}`;

        return this.http.get<MODEL>(request);

    }

    search(): Observable<MODEL[]> {
        const request = `${this.host}/${this.endpoint}`;
        return this.http.get<MODEL[]>(request);
    }


    delete(id: string | number): Observable<MODEL> {

        const request = `${this.host}/${this.endpoint}/${id}`;

        return this.http.delete<MODEL>(request)
    }



}

