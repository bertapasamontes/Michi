"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoNuevo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const placesSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    start: { type: String, required: true },
    end: { type: String, required: false }
});
exports.EventoNuevo = mongoose_1.default.model('eventos', placesSchema);
exports.default = exports.EventoNuevo;
