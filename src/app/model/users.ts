import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  // id: {type: Number, unique:true},
  name: { type: String, required: true },
  surname: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type: String, required: true},
  createdAt: Date,
  updatedAt: Date,
    
});
export const UserNuevo = mongoose.model('UsersDeMichi', userSchema); //este User es el que le da nombre a la subcarpeta de mongoDB
export default UserNuevo;