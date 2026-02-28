import { BaseModel } from "../../../../shared/class/base-model";

export interface CategoryModel extends BaseModel {
    id: number | null,
    name: string,

}


export interface CategoryApi {
    id: number;
    nome: string;
}