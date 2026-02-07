import React from "react";
import "../styles/components/header.css";

function Header() {
  return (
    <header
      className="container-fluid d-flex flex-column justify-content-center align-items-center mb-5 p-0 text-white hidden"
      id="principal"
    >
      <section className="d-flex align-items-center justify-content-center p-0 m-0">
        <div className="container-fluid p-0 m-0 d-flex align-items-center justify-content-center">
          <div>
            <p className="d-flex m-0 position-relative justify-content-center text-white meu-nome-e">
              <span className="background-opa">
                Hey! <span className="bi bi-emoji-wink-fill"></span>
              </span>
              , my name is
            </p>
            <div>
              <h1 className="col-12 mb-4 Felipe-Duarte">Felipe Duarte</h1>
            </div>

            <nav className="col d-flex align-items-center justify-content-center">
              <a
                href="https://github.com/FelipeDuartte"
                className="text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bi bi-github me-3" id="icons-glt"></span>
              </a>
              <a
                href="#"
                className="text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bi bi-linkedin me-3" id="icons-glt"></span>
              </a>
              <a
                href="https://www.tiktok.com/@f.duartee"
                className="text-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bi bi-tiktok" id="icons-glt"></span>
              </a>
            </nav>
            <div className="p-0 m-0 d-flex align-items-center justify-content-center">
              <span
                className="bi bi-arrow-down-short position-absolute p-0"
                id="down-arrow"
              ></span>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
