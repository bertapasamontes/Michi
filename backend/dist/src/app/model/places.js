"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitioNuevo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const placesSchema = new Schema({
    name: { type: String, required: true },
    mapbox_id: { type: String, required: true },
    direction: { type: String, required: false },
    short_direction: { type: String, required: false },
    coordinates: { type: [Number], required: true, unique: true },
    category: { type: [String], required: true },
});
exports.SitioNuevo = mongoose_1.default.model('sitiosDeMichi', placesSchema);
exports.default = exports.SitioNuevo;
