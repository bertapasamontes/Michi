import mongoose from 'mongoose';
const { Schema, model } = mongoose;

import * as bcrypt from 'bcrypt';

const userSchema = new Schema({
  // id: {type: Number, unique:true},
  name: { type: String, required: true },
  surname: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, required: true},
  createdAt: Date,
  updatedAt: Date,
    
});
userSchema.pre('save', async function hasheandoContraseña(next) {
  console.log('dentro de presave');
  try{
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
  catch(error){
    next();
    console.log(error);
  }
})
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
export const UserNuevo = mongoose.model('UsersDeMichi', userSchema); //este User es el que le da nombre a la subcarpeta de mongoDB
export default UserNuevo;