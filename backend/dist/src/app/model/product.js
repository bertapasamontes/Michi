"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoNuevo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const productSchema = new Schema({
    name: { type: String, required: true },
    category: [{ type: String, required: true }],
    price: { type: Number, required: true },
    site: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "sitiosDeMichi" },
    rate: { type: Number },
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "comentarios" }],
    imgProduct: { type: String }
});
exports.ProductoNuevo = mongoose_1.default.model('productos', productSchema);
exports.default = exports.ProductoNuevo;
