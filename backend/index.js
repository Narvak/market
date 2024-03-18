require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connecté a la BD"))
  .catch(() => console.log("erreur lors de la connexion a la BD"));

// ---------------------------------------------------------------------------------

const userRouter = require("./routes/UserRouter");
app.use("/api/user", userRouter);
app.use("/api/annonce", require("./routes/AnnonceRouter"));

// app.use("/api/user", require("./routes/UserRouter"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`le serveur est lancé ${PORT}`));

// 1- Créer le model
// 2- Créer le controller
// 3- définir les routes
// 4- Définir le router sur l'index.js
// 5- Test ( envoyer des requetes avec POSTMAN )
