import { Comentario } from "./comments";
import { placeGlobal } from "./places/placeGlobal";

export interface Product {
    _id?: number;
    name: string;
    category: [string];
    price: number;
    site: placeGlobal | string;
    rate: number;
    comments?: Comentario[];
    imgProduct: string;
}
