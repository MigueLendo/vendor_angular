import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CategoryService } from "../service/category-service";

export const categoryResolver: ResolveFn<any> = (route, state) => {

    const categoryService = inject(CategoryService)

    const id = route.paramMap.get('id');

    return categoryService.searchId(id!);
};

