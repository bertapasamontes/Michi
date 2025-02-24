import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const placesSchema = new Schema({
  name: { type: String, required: true },
  mapbox_id: {type: String, required: true},
  direction: { type: String, required: false },
  short_direction: { type: String, required: false },
  coordinates: { type: [Number], required: true, unique: true },
  category: { type: [String], required: true },    
});
export const SitioNuevo = mongoose.model('sitiosDeMichi', placesSchema);
export default SitioNuevo;