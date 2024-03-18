import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Error from "../../Components/Error";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [isError, setisError] = useState(false);

  const navigate = useNavigate();

  // const first = useContext(AuthContext)
  // first.token
  // first.settoken()
  const { settoken } = useContext(AuthContext);

  // rajouter l'attribue value et onChange sur chaque input

  const handleSubmit = (e) => {
    e.preventDefault();
    // http://localhost:5000/api/user/signup
    const body = { email, password };
    setisError(false);
    axios
      .post("/api/user/login", body)
      .then((res) => {
        // localStorage pour sauvegarder des informations sur le navigateur
        // pour persister les informations
        console.log(res);
        settoken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => setisError(err.response.data.message));
  };

  // Vérifier si l'utilisateur est déja connecté
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      {isError && <Error msg={isError} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            className="form-control"
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
        <button>Login</button>
      </form>
    </div>
  );
}
