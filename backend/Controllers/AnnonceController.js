// require le model qu'on va utilisé
const Annonce = require("../Models/Annonce");

// POST créer une nouvelle annonce
exports.createAnnonce = async (req, res) => {
  try {
    //  const annonce = new Annonce(req.body);
    const { nom, prix, description, qteDispo, categorie, photo } = req.body;
    const annonce = new Annonce({
      nom,
      prix,
      description,
      qteDispo,
      categorie,
      photo,
      idUser: req.payload.id,
    });

    await annonce.save();
    // req.body.idUser = req.payload.id;
    // const annonce = await Annonce.create(req.body);
    res.status(201).json({ annonce });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// GET récuperer toutes les annonces
exports.getAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.find();
    res.json({ annonces });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// GET récuperer une annonce avec son id
exports.getAnnonce = async (req, res) => {
  try {
    const { id } = req.params;
    const annonce = await Annonce.findById(id);

    if (!annonce) {
      return res.status(404).json({ message: "l'annonce n'existe pas" });
    }

    res.json({ annonce });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// DELETE supprimer un annonce avec son id
exports.deleteAnnonce = async (req, res) => {
  try {
    const { id } = req.params;
    const annonce = await Annonce.findById(id);

    if (!annonce) {
      return res.status(404).json({ message: "l'annonce n'existe pas" });
    }

    // req.params.id -> id de l'annonce
    // req.payload.id -> id de l'utilisateur
    // annonce.idUser == req.payload.id
    // req.payload.role
    // if (annonce.idUser != req.payload.id && req.payload.role != "admin") {
    if (annonce.idUser != req.payload.id) {
      return res
        .status(401)
        .json({ message: "l'annonce ne vous appartient pas" });
    }

    // Vérification
    await annonce.delete();
    res.json({ annonce });

    // res.status(204);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// PUT mettre à jours une annonce
exports.updateAnnonce = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prix, description, qteDispo, categorie, photo } = req.body;
    let annonce = await Annonce.findById(id);

    if (!annonce) {
      return res.status(404).json({ message: "l'annonce n'existe pas" });
    }

    if (annonce.idUser != req.payload.id) {
      return res
        .status(401)
        .json({ message: "l'annonce ne vous appartient pas" });
    }

    annonce.prix = prix;
    annonce.nom = nom;
    annonce.description = description;
    annonce.qteDispo = qteDispo;
    annonce.categorie = categorie;
    annonce.photo = photo;
    await annonce.save();

    res.json({ annonce });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// GET pour récuperer les annonces du user connecté
exports.getAnnoncesUser = async (req, res) => {
  try {
    // req.payload.id -> token
    // idUser -> annonces
    const annonces = await Annonce.find({ idUser: req.payload.id });
    res.json({ annonces });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
