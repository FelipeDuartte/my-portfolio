import React from "react";
import "../styles/components/navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top hidden">
      <div className="container d-flex justify-content-center p-0">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link text-white me-4" href="#principal">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white me-4" href="#sobre-mim">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white me-4" href="#projetos">
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white me-4" href="#contato">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
