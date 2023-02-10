import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.css"

// We will eventually need some functions up here for authentication

export default function Nav() {
  return (
    <div>
      <nav className="navBar">
        <NavLink className={"navBarInfo"} to="/">
          Home
        </NavLink>
        <NavLink className={"navBarInfo"} to="/create">
          Create Post 
        </NavLink>
        <NavLink className={"navBarInfo"} to="/readmex2">
          ReadMe within a Readme
        </NavLink>
        <div className="navBarInfo" id="barButton">
        <NavLink className={"navBarInfo"} id="navbar-buttons" to="/signup">
          Sign-Up
        </NavLink>
        <NavLink className={"navBarInfo"} id="navbar-buttons" to="/signin">
          Sign-In
        </NavLink>
        </div>
      </nav>
    </div>
  );
}
