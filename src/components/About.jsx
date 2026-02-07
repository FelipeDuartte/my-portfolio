import React from "react";
import "../styles/components/aboutMe.css";

function ServiceCard({ icon, title, description }) {
  return (
    <div className="service-card">
      <div className="service-icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

function About() {
  const services = [
    {
      icon: "bi-laptop",
      title: "Websites & Applications",
      description:
        "Landing pages, corporate websites and custom web applications",
    },
    {
      icon: "bi-phone",
      title: "Automation",
      description:
        "Design and implement automated solutions that optimize workflows, save time, and improve business productivity.",
    },
    {
      icon: "bi-gear",
      title: "Maintenance",
      description:
        "Complete maintenance services including system, plugin, and security updates, layout bug fixes, performance optimization with backups, and continuous monitoring and support",
    },
    {
      icon: "bi-search",
      title: "SEO & Performance",
      description: "Optimization for search engines",
    },
    {
      icon: "bi-search",
      title: "Integration between Systems",
      description:
        "Connecting different systems to ensure seamless data flow, efficiency, and reliable communication.",
    },
  ];

  return (
    <section className="about-me" id="sobre-mim">
      <div className="about-me-container">
        <div className="section-header text-center">
          <p className="section-subtitle text-white fw-bold m-0 hidden">
            find out more
          </p>
          <h2 className="section-title fw-bold hidden">About Me</h2>
        </div>

        <div className="about-content d-flex justify-content-center align-items-start hidden">
          <div className="about-image text-center">
            <img
              src="/imagens/my-foto.png"
              alt="Felipe Duarte"
              className="profile-img"
            />
          </div>

          <div className="about-text text-left">
            <h3>
              Hello, my name is
              <span className="highlight fw-bold"> Felipe Duarte!</span>
            </h3>
            <p className="bio">
              Hello, I'm Felipe, 19 years old, a developer in continuous
              learning. I am interested in both front-end and back-end work,
              exploring different areas to become a more complete professional.
              I approach every project as an opportunity to grow, applying
              creativity, dedication and logic to turn ideas into functional,
              well-structured digital solutions.
            </p>

            {/* Services section */}
            <div className="services-section">
              <h3 className="services-title">Services I Offer</h3>

              <div className="services-grid">
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                  />
                ))}
              </div>

              <div className="text-center">
                <a href="#contato" className="cta-button">
                  <i className="bi bi-envelope"></i>
                  Request a Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
