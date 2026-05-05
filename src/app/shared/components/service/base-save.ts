import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';



//TODO: tirar de dentro de pasta components e apagar o service.ts

export class BaseSave<MODEL> {

    http = inject(HttpClient);
    host: string = "http://localhost:3000";
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

