import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";

export default function Navbar() {
  const { token, settoken } = useContext(AuthContext);

  const logout = () => {
    settoken("");
    localStorage.removeItem("token");
  };

  // token
  return (
    <div>
      <NavLink to="/"> Home </NavLink>

      {token ? (
        <>
          <NavLink to="/annonce"> Annonce </NavLink>
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login"> Login </NavLink>
          <NavLink to="/register"> Register </NavLink>
        </>
      )}
    </div>
  );
}
