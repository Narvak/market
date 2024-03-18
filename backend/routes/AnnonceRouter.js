const express = require("express");
const router = express.Router();
const annonceController = require("../Controllers/AnnonceController");
const { auth } = require("../middleware/auth");

router.post("/", auth, annonceController.createAnnonce);
router.get("/", annonceController.getAnnonces);
router.get("/getAnnoncesUser", auth, annonceController.getAnnoncesUser);

router.get("/:id", annonceController.getAnnonce);
router.delete("/:id", auth, annonceController.deleteAnnonce);
router.put("/:id", auth, annonceController.updateAnnonce);

module.exports = router;
