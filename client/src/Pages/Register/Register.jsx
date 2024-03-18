import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  // rajouter l'attribue value et onChange sur chaque input

  const handleSubmit = (e) => {
    e.preventDefault();
    // http://localhost:5000/api/user/signup
    const body = { nom, prenom, email, password };
    axios
      .post("/api/user/signup", body)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          d<label htmlFor="nom"> Nom </label>
          <input
            className="test"
            type="text"
            placeholder="nom"
            id="nom"
            value={nom}
            onChange={(e) => setnom(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="prenom"> prenom </label>
          <input
            className="test"
            type="text"
            placeholder="prenom"
            id="prenom"
            name="prenom"
            value={prenom}
            onChange={(e) => setprenom(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email"> email </label>
          <input
            className="test"
            type="email"
            placeholder="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password"> password </label>
          <input
            className="test"
            type="password"
            placeholder="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
}
