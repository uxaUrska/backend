const mongoose = require('mongoose');

const zaposleniSchema = new mongoose.Schema({
    id: {type: String},
    ime: { type: String, required: true },
    priimek: { type: String, required: true },
    vloga: { type: String, enum: ['zaposleni', 'direktor', 'finančni analitik', 'marketinški analitik'], required: true },
    email: { type: String, required: true, unique: true },
    stroški: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Strošek' }]
});

const Zaposleni = mongoose.model('Zaposleni', zaposleniSchema);