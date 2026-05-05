import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthStoreService } from './auth-store-service';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {

  authStoreService = inject(AuthStoreService)

  private http = inject(HttpClient);

  private path = `${environment.apiUrl}/login/miguel`;

  getUser() {

    const token = this.authStoreService.token();
    console.log("Enviando token para o GET:", token)

    return this.http.get(this.path, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap((data: any) => {
        this.authStoreService.setAuthToken(data.data)
      })
    )


  }
}
