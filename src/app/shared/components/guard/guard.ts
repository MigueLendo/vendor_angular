import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';


export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {

    router.navigate(['/home']);
    return true;
  } else {

    router.navigate(['/unauthorized']);
    return false;
  }
};
