"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentarioNuevo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const commentSchema = new Schema({
    product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "productos" }, // relacionado con un producto
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "UsersDeMichi" }, // relacionado con un usuario de michi
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});
exports.ComentarioNuevo = mongoose_1.default.model('comentarios', commentSchema);
exports.default = exports.ComentarioNuevo;
