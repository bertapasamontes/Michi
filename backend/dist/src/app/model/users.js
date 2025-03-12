"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNuevo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const bcrypt = __importStar(require("bcrypt"));
const defaultImages = [
    '../../assets/img/profile-images/michi-default.png',
    // '../../assets/img/profile-images/michi-cook.png',
    '../../assets/img/profile-images/michi-gold.png',
    '../../assets/img/profile-images/michi-idea2.png',
    '../../assets/img/profile-images/michi-suerte.png',
];
const userSchema = new Schema({
    // id: {type: Number, unique:true},
    name: { type: String, required: true },
    // surname: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    imgProfile: { type: String, default: () => defaultImages[Math.floor(Math.random() * defaultImages.length)] },
    comments: { type: { type: String } },
    misFavs: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "productos" }],
    createdAt: Date,
    updatedAt: Date,
});
//hasheamos la contraseña antes de guardar el user en la base de datos
userSchema.pre('save', function hasheandoContraseña(next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('dentro de presave');
        try {
            this.password = yield bcrypt.hash(this.password, 10);
            next();
        }
        catch (error) {
            next();
            console.log(error);
        }
    });
});
exports.UserNuevo = mongoose_1.default.model('UsersDeMichi', userSchema); //este User es el que le da nombre a la subcarpeta de mongoDB
exports.default = exports.UserNuevo;
