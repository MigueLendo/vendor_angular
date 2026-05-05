import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStoreService } from '../service/auth-store-service';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authStoreService = inject(AuthStoreService);

    const token = authStoreService.token();

    if (token) {
        return true;
    } else {
        router.navigate(['/unauthorized']);
        return false;
    }
};
