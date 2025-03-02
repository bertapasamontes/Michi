"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNuevo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    // id: {type: Number, unique:true},
    name: { type: String, required: true },
    surname: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    createdAt: Date,
    updatedAt: Date,
});
// userSchema.pre('save', async function(next){
//   console.log('dentro de presave');
//   if (!this.isModified("password")) return next(); 
//   try{
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   }
//   catch(error){
//     next();
//     console.log(error);
//   }
// });
exports.UserNuevo = mongoose_1.default.model('UsersDeMichi', userSchema); //este User es el que le da nombre a la subcarpeta de mongoDB
exports.default = exports.UserNuevo;
