import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILoginModel } from '../../../login/interface/login-model';
import { AuthStoreService } from './auth-store-service';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {

  authStoreService = inject(AuthStoreService);

  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/login/miguel`;

  tokenCreate(model: ILoginModel): Observable<any> {

    const { email, password } = model;

    const auth = `Basic ${btoa(`${email}:${password}`)}`;

    return this.http.post(this.path, {}, {
      headers: {
        'Authorization': auth
      }
    }).pipe(
        tap((data: any) => {
          if (data && data.data) {
            this.authStoreService.setAuthToken(data.data);

            if (data.data.user) {
              this.authStoreService.setAuthUser(data.data.user);
            }
          }
        })
      );
  }
}
