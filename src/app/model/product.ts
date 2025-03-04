import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    price:{type: Number, required: true},
    site: { type: mongoose.Schema.Types.ObjectId, ref: "sitiosDeMichi" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comentarios" }]
});
export const ProductoNuevo = mongoose.model('productos', productSchema);
export default ProductoNuevo;