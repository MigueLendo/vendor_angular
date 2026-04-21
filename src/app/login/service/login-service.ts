import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ILoginModel } from '../interface/login-model';
import { AuthLoginService } from '../../shared/components/service/auth-login-service';
import { AuthStoreService } from '../../shared/components/service/auth-store-service';
import { AuthUserService } from '../../shared/components/service/auth-user-service';


@Injectable({
  providedIn: 'root',
})

export class LoginService {

  authStoreService = inject(AuthStoreService);

  authLoginService = inject(AuthLoginService);

  authUserService = inject(AuthUserService)

  login(model: ILoginModel): Observable<boolean> {

    return this.authLoginService.tokenCreate(model).pipe(
      switchMap(() => {

        return this.authUserService.getUser()
      }),
      map(() => {
        
        return this.authStoreService.isLogged()
      })
    )
  }

}
