import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { measureService } from "../service/measure-service";

export const measureDataResolverList: ResolveFn<any> = (route, _state) => {
    let measure = inject(measureService)

    return measure.search()

}