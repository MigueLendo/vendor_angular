import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})


export class LoginService {

  private http = inject(HttpClient)
  private path = "http://localhost:3000/login/miguel";

  tokenCreate(code: string): Observable<any> {
    return this.http.post(this.path, {}, { // Use {} em vez de null
      headers: {
        'Authorization': code
      }
    });
  }

}
