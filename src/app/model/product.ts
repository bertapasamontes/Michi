import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    price:{type: Number, required: true},
    site: { type: mongoose.Schema.Types.ObjectId, ref: "sitiosDeMichi" },
    rate:{type: Number},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comentarios" }],
    imgProduct: {type:String}
});
export const ProductoNuevo = mongoose.model('productos', productSchema);
export default ProductoNuevo;