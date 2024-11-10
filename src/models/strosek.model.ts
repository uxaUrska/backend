const strosekSchema = new mongoose.Schema({
    naziv: { type: String, required: true },
    znesek: { type: Number, required: true },
    datum: { type: Date, default: Date.now },
    kategorija: { type: String, required: true },
    zaposleni: { type: mongoose.Schema.Types.ObjectId, ref: 'Zaposleni' }
  });
  
  const Strosek = mongoose.model('Strosek', strosekSchema);
  