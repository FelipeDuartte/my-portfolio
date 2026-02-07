import React from "react";
import "../styles/components/projects.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
function ProjectCard({
  title,
  image,
  link,
  description,
  features,
  technologies,
}) {
  return (
    <div className="col-lg-6 col-md-10 hidden-competencias">
      <div className="card-projeto">
        <div className="card-body p-0 d-flex flex-column">
          <h2 className="card-titulo p-3 text-center">{title}</h2>
          <img src={image} className="img-projeto mb-4" alt={title} />
          <a
            className="text-center"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="project-button text-center btn btn-dark m-auto">
              Show Project <i className="px-3 bi bi-box-arrow-up-right"></i>
            </button>
          </a>
          <div className="legenda-projeto flex-grow-1">
            <p>{description}</p>
            <ul className="mt-2 ps-4" style={{ listStyleType: "none" }}>
              {features.map((feature, index) => (
                <li key={index}>
                  <i className="bi bi-check-circle-fill me-2"></i> {feature}
                </li>
              ))}
            </ul>
            <div className="tecnologias">
              {technologies.map((tech, index) => (
                <span key={index} className="tecnologia-badge">
                  <i className={`bi ${tech.icon} me-1`}></i> {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [ProjectActive, setProjectActive] = useState("frontend");
  const frontendProjects = [
    {
      title: "JornadaDev",
      image: "/imagens/page-trilha.png",
      link: "https://felipeduartte.github.io/trilha-dev/",
      description: "Page designed to help developers who are starting out.",
      features: [
        "Step-by-step learning platform",
        "Website guide for programming beginners",
        "Intuitive navigation",
        "Focus on programming fundamentals",
      ],
      technologies: [
        { icon: "bi-filetype-html", name: "HTML5" },
        { icon: "bi-filetype-css", name: "CSS3" },
        { icon: "bi-filetype-js", name: "JavaScript" },
        { icon: "bi-palette-fill", name: "Bootstrap5" },
      ],
    },
    {
      title: "Portfólio",
      image: "/imagens/pagePortfolio.png",
      link: "#",
      description: "My portfolio as a Full-stack developer.",
      features: [
        "Galaxy animation",
        "Intuitive navigation",
        "UI/UX",
        "Single page",
      ],
      technologies: [
        { icon: "bi-filetype-html", name: "HTML5" },
        { icon: "bi-filetype-css", name: "CSS3" },
        { icon: "bi-filetype-js", name: "JavaScript" },
        { icon: "bi-palette-fill", name: "UI/UX" },
      ],
    },
    {
      title: "Links Page",
      image: "/imagens/page-links.png",
      link: "https://felipeduartte.github.io/redes-links/",
      description: "Link landing page for clients.",
      features: [
        "Mobile-first design",
        "Intuitive navigation",
        "Multiple social networks",
        "Easy navigation",
      ],
      technologies: [
        { icon: "bi-filetype-html", name: "HTML5" },
        { icon: "bi-filetype-css", name: "CSS3" },
        { icon: "bi-filetype-js", name: "JavaScript" },
        { icon: "bi-palette-fill", name: "UI/UX" },
      ],
    },
  ];

  const fullstackProjects = [
    {
      title: "Beverage Distributor",
      image: "/imagens/projectBebidas.png",
      link: "#",
      description: "Website created for a beverage distributor.",
      features: [
        "Product Catalog",
        "Shopping cart and checkout",
        "Promotions and Highlights",
        "Authentication and User",
      ],
      technologies: [
        { icon: "bi-filetype-html", name: "HTML5" },
        { icon: "bi-filetype-css", name: "CSS3" },
        { icon: "bi-filetype-jsx", name: "React" },
        { icon: "bi-palette-fill", name: "Bootstrap" },
      ],
    },
  ];

  const backendProjects = [
    {
      title: "Automation of Task",
      image: "/imagens/Pageautomação.png",
      link: "https://github.com/FelipeDuartte/GeradorComprovantes",
      description: "Excel + Word automation .exe program.",
      features: [
        "Integration Excel + Word",
        "File .exe",
        "individual generation of receipts per scholarship recipeint",
        "Automation python",
      ],
      technologies: [
        { icon: "bi-filetype-html", name: "HTML5" },
        { icon: "bi-filetype-css", name: "CSS3" },
        { icon: "bi-filetype-jsx", name: "React" },
        { icon: "bi-palette-fill", name: "Bootstrap" },
      ],
    },
    ];

  const studyProjects = [
    {
      title: "Guess Game",
      image: "/imagens/PageAdivinha.png",
      link: "#",
      description: "Guess Game.",
      features: [
        "It only works on computers.",
        "React API",
        "Dynamic word change",
        "Scoring system",
      ],
      technologies: [
        { icon: "bi-filetype-html", name: "HTML5" },
        { icon: "bi-filetype-css", name: "CSS3" },
        { icon: "bi-filetype-jsx", name: "React" },
        { icon: "bi-palette-fill", name: "Bootstrap" },
      ],
    },
  ];
  return (
    <section className="container py-5 hidden" id="projetos">
      <div className="DivTituloProjetos">
        <h1 className="titulo-projetos fw-bold text-center">
          <i className="bi bi-rocket-takeoff"></i> Projects
        </h1>
      </div>
      <nav className="nav-projetos">
        <button
          className={ProjectActive === "frontend" ? "active" : ""}
          onClick={() => setProjectActive("frontend")}
        >
          Front-end
        </button>

        <button
          className={ProjectActive === "fullstack" ? "active" : ""}
          onClick={() => setProjectActive("fullstack")}
        >
          Full-stack
        </button>

        <button
          className={ProjectActive === "backend" ? "active" : ""}
          onClick={() => setProjectActive("backend")}
        >
          Back-end
        </button>

        <button
          className={ProjectActive === "study" ? "active" : ""}
          onClick={() => setProjectActive("study")}
        >
          Study
        </button>
      </nav>
      {/* Front-end Projects */}
      {ProjectActive === "frontend" && (
        <>
          <h2 className="subtitulo-projetos fw-bold text-center mt-2 mb-4">
            Front-end Projects
          </h2>
          <div className="row g-4 justify-content-center">
            {frontendProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </>
      )}

      {/* Full-Stack Projects */}
      {ProjectActive === "fullstack" && (
        <>
          <h2 className="subtitulo-projetos fw-bold text-center mt-5 mb-4">
            Full-Stack Projects
          </h2>
          <div className="row g-4 justify-content-center">
            {fullstackProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </>
      )}
      {/* Back-end Projects */}
      {ProjectActive === "backend" && (
        <>
          <h2 className="subtitulo-projetos fw-bold text-center mt-5 mb-4">
            Back-end Projects
          </h2>
          <div className="row g-4 justify-content-center">
            {backendProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </>
      )}
      {/* Study Projects */}
      {ProjectActive === "study" && (
        <>
          <h2 className="subtitulo-projetos fw-bold text-center mt-5 mb-4">
            Study Projects
          </h2>
          <div className="row g-4 justify-content-center">
            {studyProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Projects;
