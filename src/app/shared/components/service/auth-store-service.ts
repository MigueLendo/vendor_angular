import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {

  token = signal<string>("")
  expireAt = signal<number>(0)
  user = signal<any>({})


  isLogged = computed(() => {

    return !!this.token() && !this.isTokenExpired()

  })

  isTokenExpired = computed(() => {

    const exp = this.expireAt()

    return exp ? Date.now() > exp : true

  })

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    const token = localStorage.getItem('token');
    const expireAt = localStorage.getItem('expireAt');
    const user = localStorage.getItem('user');

    
    this.token.set(token || '');
    this.expireAt.set(Number(expireAt || '0'));

    try {
      this.user.set(user ? JSON.parse(user) : {});
    } catch {
      this.user.set({});
    }
  }

  setAuthToken(data: any) {
    if (data && data.token) {

      const expireIn = data.expireIn || 3600;
      const expireAt = Date.now() + (expireIn * 1000);

      this.expireAt.set(expireAt);
      this.token.set(data.token);

      localStorage.setItem('token', data.token);
      localStorage.setItem('expireAt', expireAt.toString());
    }
  }

  setAuthUser(data: any) {

    this.user.set(data)

    localStorage.setItem('user', JSON.stringify(data))
  }


  getUser() {

    return this.user()

  }

}
