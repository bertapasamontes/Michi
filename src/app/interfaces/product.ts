import { placeGlobal } from "./places/placeGlobal";

export interface User {
    _id?: number;
    name: string;
    category: string;
    price: number;
    site: placeGlobal | string;
    comments?: Comment[];
}
