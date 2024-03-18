import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../../Components/Spinner";

export default function Home() {
  const [annonces, setannonces] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    // 1- envoyer une requete pour récuperer toutes les annonces du site
    // 2- Affecter le résultat de la requete a une variable d'état
    // 3- Afficher le contenue de la variable d'état à l'aide du .map()
    setisLoading(true);
    axios
      .get("/api/annonce")
      .then((res) => setannonces(res.data.annonces))
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  }, []);

  return (
    <div>
      {isLoading && <Spinner />}
      {/* isLoading ? <Spinner /> : <></> */}
      {annonces.map((annonce) => {
        return (
          <div key={annonce._id}>
            <p>Nom: {annonce.nom}</p>
            <p>Prix: {annonce.prix} </p>
            <p>description: {annonce.description} </p>
            <p>qteDispo: {annonce.qteDispo} </p>
            <p>categorie: {annonce.categorie} </p>
            <p>photo: {annonce.photo} </p>
            <NavLink to={`/annonce/${annonce._id}`}> Détails </NavLink>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
