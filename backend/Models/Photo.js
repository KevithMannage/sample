import mongoose from 'mongoose';

 const photoSchema = new mongoose.Schema({
  name: String,
  path: String,
  originalName: String,
  createdAt: { type: Date, default: Date.now }
});
const photo= mongoose.model('photo', photoSchema);
export default photo;
