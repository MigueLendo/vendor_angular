import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthStoreService } from './auth-store-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {

  authStoreService = inject(AuthStoreService)

  private http = inject(HttpClient);

  private path = "http://localhost:3000/miguel/login";

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

    // return this.http.get(this.path).pipe(
    //   tap((data: any) => {

    //     const userinfo = data.data
    //     this.authStoreService.setAuthUser(userinfo)
    //   })
    // )
  }
}
