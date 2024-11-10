const kpiSchema = new mongoose.Schema({
    id: {type: String},
    naziv: { type: String, required: true },
    vrednost: { type: Number, required: true },
    obdobje: { type: String, required: true },
    opis: String,
    datum: { type: Date, default: Date.now }
  });
  
  const KPI = mongoose.model('KPI', kpiSchema);
  