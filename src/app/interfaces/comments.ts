export interface Comment {
    _id?: string;
    product: string; // ID del producto
    user: string; // ID del user que lo ha dicho
    text: string;
    rating: number;
    createdAt?: Date;
}