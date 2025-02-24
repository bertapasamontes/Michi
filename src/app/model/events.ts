import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const placesSchema = new Schema({
  title: { type: String, required: true },
  description: {type: String, required: false},
  start: { type: String, required: true },
  end: { type: String, required: false }
});
export const EventoNuevo = mongoose.model('eventos', placesSchema);
export default EventoNuevo;