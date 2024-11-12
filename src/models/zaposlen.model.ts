import mongoose from "mongoose";

const zaposleniSchema = new mongoose.Schema({
    id: {type: String},
    ime: { type: String, required: true },
    priimek: { type: String, required: true },
    vloga: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

export const Zaposleni = mongoose.model('Zaposleni', zaposleniSchema);