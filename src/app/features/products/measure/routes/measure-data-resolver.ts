import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";

import { measureService } from "../service/measure-service";

export const measureResolver: ResolveFn<any> = (route, state) => {

    const Measureservice = inject(measureService)

    const id = route.paramMap.get('id');

    return Measureservice.searchId(id!);
};

