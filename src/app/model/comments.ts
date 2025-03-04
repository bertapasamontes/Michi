import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "productos" }, // relacionado con un producto
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UsersDeMichi" }, // relacionado con un usuario de michi
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

export const ComentarioNuevo = mongoose.model('comentarios', commentSchema);
export default ComentarioNuevo;