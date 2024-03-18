import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Annonce() {
  const [id, setid] = useState("");
  const [nom, setnom] = useState("");
  const [prix, setprix] = useState(0);
  const [description, setdescription] = useState("");
  const [categorie, setcategorie] = useState("");
  const [qteDispo, setqteDispo] = useState(1);
  const [photo, setphoto] = useState("");

  const [annonces, setannonces] = useState([]);

  const navigate = useNavigate();

  // 1- envoyer une requete pour récuperer toutes les annonces du site à l'interieur d'un useEffect
  // 2- Affecter le résultat de la requete a une variable d'état
  // 3- Afficher le contenue de la variable d'état à l'aide du .map()

  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .get("/api/annonce/getAnnoncesUser", config)
      .then((res) => setannonces(res.data.annonces))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  // 1- Créer les useState
  // 2- Créer les inputs
  // 3- je rajoute pour chaque input l'attribue value et onChange
  // 4- Ajouter le onSubmit sur le formulaire
  // 5- e.preventDefault()
  // 6- Envoyer une requete

  const createAnnonce = (e) => {
    e.preventDefault();
    const annonce = { nom, prix, description, categorie, qteDispo, photo };

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .post("/api/annonce", annonce, config)
      .then((res) => {
        setannonces([res.data.annonce, ...annonces]);
        setnom("");
        setprix(0);
        setdescription("");
        setqteDispo(1);
        setphoto("");
        setcategorie("");
      })
      .catch((err) => console.log(err));
  };

  const deleteAnnonce = (id) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .delete("/api/annonce/" + id, config)
      .then((res) => {
        // annonces.filter((annonce) => {
        //   if (annonce._id === id) {
        //     return false;
        //   } else {
        //     return true;
        //   }
        // });

        const tmp = annonces.filter((annonce) => annonce._id !== id);
        setannonces(tmp);

        // setannonces(annonces.filter((annonce) => annonce._id !== id))
      })
      .catch((err) => console.log(err));
  };

  const updateForm = (annonce) => {
    setid(annonce._id);
    setnom(annonce.nom);
    setprix(annonce.prix);
    setdescription(annonce.description);
    setcategorie(annonce.categorie);
    setqteDispo(annonce.qteDispo);
    setphoto(annonce.photo);
  };

  const updateAnnonce = (e) => {
    e.preventDefault();

    const annonce = { nom, prix, categorie, description, qteDispo, photo };
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .put(`/api/annonce/${id}`, annonce, config)
      .then((res) => {
        const tmp = annonces.filter((annonce) => annonce._id !== id);
        setannonces([res.data.annonce, ...tmp]);

        setnom("");
        setprix(0);
        setdescription("");
        setqteDispo(1);
        setphoto("");
        setcategorie("");
        setid("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={id ? updateAnnonce : createAnnonce}>
        <div>
          <label> Nom: </label>
          <input
            type="text"
            placeholder="nom"
            value={nom}
            onChange={(e) => setnom(e.target.value)}
          />
        </div>
        <div>
          <label> prix: </label>
          <input
            type="number"
            placeholder="prix"
            value={prix}
            onChange={(e) => setprix(e.target.value)}
          />
        </div>
        <div>
          <label> description: </label>
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        <div>
          <label> categorie: </label>
          <input
            type="text"
            placeholder="categorie"
            value={categorie}
            onChange={(e) => setcategorie(e.target.value)}
          />
        </div>
        <div>
          <label> photo: </label>
          <input
            type="text"
            placeholder="photo"
            value={photo}
            onChange={(e) => setphoto(e.target.value)}
          />
        </div>
        <div>
          <label> qteDispo: </label>
          <input
            type="number"
            placeholder="qteDispo"
            value={qteDispo}
            onChange={(e) => setqteDispo(e.target.value)}
          />
        </div>
        <button> {id ? "Update une annonce" : "Créer une annonce"} </button>
      </form>

      <div>
        {annonces.map((annonce) => {
          return (
            <div key={annonce._id}>
              <p>Nom: {annonce.nom}</p>
              <p>Prix: {annonce.prix} </p>
              <p>description: {annonce.description} </p>
              <p>qteDispo: {annonce.qteDispo} </p>
              <p>categorie: {annonce.categorie} </p>
              <p>photo: {annonce.photo} </p>
              <button onClick={() => deleteAnnonce(annonce._id)}>
                Supprimer
              </button>
              <button onClick={() => updateForm(annonce)}> Update </button>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}
