import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register/Register";
import Annonce from "./Pages/Annonce/Annonce";
import DetailAnnonce from "./Pages/DetailAnnonce/DetailAnnonce";
import Spinner from "./Components/Spinner";

export const AuthContext = createContext();

export default function App() {
  const [token, settoken] = useState(localStorage.getItem("token"));

  // 1 - Créer un context à l'aide du createContext()
  // 2 - D'ajouter le Context.Provider comme balise principale du App.js
  // 3 - Créer les variables d'état et de les ajouter au value du provider
  // 4 - Utiliser le useContext pour récuperer les value du provider

  return (
    <AuthContext.Provider value={{ token, settoken }}>
      <BrowserRouter>
        <div>App</div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/annonce" element={<Annonce />} />
          <Route path="/annonce/:id" element={<DetailAnnonce />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

// npx create-react-app .
// npm i react-router-dom
// Créer 3 composants Home, Login, Register ( rfc )
// Ajouter le routage a l'appli ( BrowserRouter )
// "/" -> Home
// "/login" -> Login
// "/register" -> Register
// Navbar ( Link || NavLink )
