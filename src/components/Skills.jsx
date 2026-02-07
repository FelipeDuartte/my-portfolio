import React from "react";
import "../styles/components/skills.css";

function SkillItem({ icon, name }) {
  return (
    <div className="col-4">
      <div className="skill-item">
        <img src={icon} alt={name} />
        <span>{name}</span>
      </div>
    </div>
  );
}

function SkillsCard({ title, icon, children }) {
  return (
    <div className="col-lg-6">
      <div className="skills-card">
        <div className="skills-header">
          <i className={`bi ${icon}`}></i>
          <h5>{title}</h5>
        </div>
        <div className="row g-3">{children}</div>
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section className="skills py-5" id="skills">
      <div className="container">
        <div className="row g-4">
          <h1 className="titulo-projetos fw-bold text-center">
            Skills & Technologies
          </h1>

          {/* Front-end */}
          <SkillsCard title="Front-end" icon="bi-window">
            <SkillItem icon="/imagens/iconreact.png" name="React" />
            <SkillItem icon="/imagens/iconhtml.png" name="HTML" />
            <SkillItem icon="/imagens/iconcss.png" name="CSS" />
            <SkillItem icon="/imagens/iconjs.png" name="JavaScript" />
            <SkillItem icon="/imagens/iconbootstrap.png" name="Bootstrap" />
            <SkillItem icon="/imagens/iconTailwind.png" name="Tailwind" />
          </SkillsCard>

          {/* Ferramentas */}
          <SkillsCard title="Ferramentas & Skills" icon="bi-tools">
            <SkillItem icon="/imagens/icongit.png" name="Git" />
            <SkillItem icon="/imagens/icongithub.webp" name="GitHub" />
            <SkillItem icon="/imagens/iconN8N.jpg" name="N8N" />
            <SkillItem icon="/imagens/usa.png" name="English" />
          </SkillsCard>

          {/* Back-end */}
          <SkillsCard title="Back-end" icon="bi-server">
            <SkillItem icon="/imagens/iconpython.png" name="Python" />
            <SkillItem icon="/imagens/iconnodejs.png" name="Node.js" />
          </SkillsCard>

          {/* Banco de Dados */}
          <SkillsCard title="Banco de Dados" icon="bi-database">
            <SkillItem icon="/imagens/iconmongodb.png" name="MongoDB" />
            <SkillItem icon="/imagens/iconmySQL.png" name="MySQL" />
          </SkillsCard>
        </div>
      </div>
    </section>
  );
}

export default Skills;
