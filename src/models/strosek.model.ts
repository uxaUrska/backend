import mongoose from "mongoose";

const strosekSchema = new mongoose.Schema({
    id: {type: String},
    naziv: { type: String, required: true },
    znesek: { type: Number, required: true },
    datum: { type: Date, default: Date.now },
    kategorija: { type: String, required: true },
    oseba: {type: String, required: true},
    nacinPlacila: {type: String, required: true},
    komentar: {type: String}
  });
  
  export const Strosek = mongoose.model('Strosek', strosekSchema);
  