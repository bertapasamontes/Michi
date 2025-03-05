import mongoose from 'mongoose';
const { Schema, model } = mongoose;

import * as bcrypt from 'bcrypt';


const defaultImages = [
  '../../assets/img/profile-images/michi-default.png',
  // '../../assets/img/profile-images/michi-cook.png',
  '../../assets/img/profile-images/michi-gold.png',
  '../../assets/img/profile-images/michi-idea.png',
  '../../assets/img/profile-images/michi-suerte.png',
];


const userSchema = new Schema({
  // id: {type: Number, unique:true},
  name: { type: String, required: true },
  // surname: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, required: true},
  imgProfile: {type: String, default: () => defaultImages[Math.floor(Math.random() * defaultImages.length)]},
  comments: {type: {type: String}},
  createdAt: Date,
  updatedAt: Date,
    
});
//hasheamos la contraseña antes de guardar el user en la base de datos
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
export const UserNuevo = mongoose.model('UsersDeMichi', userSchema); //este User es el que le da nombre a la subcarpeta de mongoDB
export default UserNuevo;