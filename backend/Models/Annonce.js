const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prix: { type: Number, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  qteDispo: { type: Number, default: 1, min: 1 },
  categorie: { type: String, required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Annonce = mongoose.model("Annonce", annonceSchema);

module.exports = Annonce;
