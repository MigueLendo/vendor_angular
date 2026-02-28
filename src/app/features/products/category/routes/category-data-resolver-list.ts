import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CategoryService } from "../service/category-service";

// Modificador Nome: Tipo da variavel = Atribuição 
export const categoryDataResolverList: ResolveFn<any> = (route, _state) => {
    let category = inject(CategoryService);
    return category.search();
}