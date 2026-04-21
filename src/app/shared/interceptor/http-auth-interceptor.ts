import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthStoreService } from "../components/service/auth-store-service";

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {

    const authStore = inject(AuthStoreService)

    const token = authStore.token()


    console.log(!token)
    if (!token || req.url.includes("/login")) {

        return next(req)
    }
    else {


        const cloneRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            },
        })
        return next(cloneRequest)
    }
}