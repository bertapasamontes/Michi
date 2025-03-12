import { Comentario } from "./comments";
import { placeGlobal } from "./places/placeGlobal";

export interface Product {
    _id?: string;
    name: string;
    category: string[];
    price: number;
    site: placeGlobal;
    rate: number;
    comments?: Comentario[];
    imgProduct: string;
}
