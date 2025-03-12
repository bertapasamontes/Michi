import { User } from "./users";

export interface Comentario {
    _id?: string;
    product: string; // ID del producto
    user: User; // ID del user que lo ha dicho
    text: string;
    rating: number;
    createdAt?: Date;
}