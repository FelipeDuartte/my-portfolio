import React, { useEffect } from "react";
import { BrowserRouter, Routes, NavLink, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import GalaxyCanvas from "./components/GalaxyCanvas";
import { useScrollObserver } from "./hooks/useScrollObserver";
import { useNavbarVisibility } from "./hooks/useNavbarVisibility";

function App() {
  useScrollObserver();
  useNavbarVisibility();

  return (
    <>
      <GalaxyCanvas />
      <div className="container-fluid p-0 m-0 content">
        <Navbar />
        <Header />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
