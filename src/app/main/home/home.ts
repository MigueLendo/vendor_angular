import { Component, inject } from '@angular/core';
import { AuthStoreService } from '../../shared/components/service/auth-store-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  authStoreService = inject(AuthStoreService);

  get messageName() {

    const user = this.authStoreService.user(); 
    return user.nomecredencial;
  }
}
