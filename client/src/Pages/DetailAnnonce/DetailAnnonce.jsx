import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function DetailAnnonce() {
  const { id } = useParams();
  const [annonce, setannonce] = useState({
    nom: "",
    prix: 0,
    description: "",
    categorie: "",
    photo: "",
    qteDispo: 0,
  });

  // 1- envoyer une requete pour récuperer l'annonce avec son id
  // 2- Affecter le résultat de la requete a une variable d'état
  // 3- Afficher le contenue de la variable d'état
  useEffect(() => {
    axios
      .get(`/api/annonce/${id}`)
      .then((res) => setannonce(res.data.annonce))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      DetailAnnonce
      <p>Nom: {annonce.nom}</p>
      <p>Prix: {annonce.prix} </p>
      <p>description: {annonce.description} </p>
      <p>qteDispo: {annonce.qteDispo} </p>
      <p>categorie: {annonce.categorie} </p>
      <p>photo: {annonce.photo} </p>
    </div>
  );
}
