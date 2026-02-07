import React, { useState } from "react";
import "../styles/components/contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nome, email, mensagem } = formData;

    if (nome.trim() && email.trim() && mensagem.trim()) {
      setFeedback("Obrigado, logo mais entrarei em contato!");
      setFormData({ nome: "", email: "", mensagem: "" });
      setTimeout(() => setFeedback(""), 3000);
    } else {
      setFeedback("Por favor, preencha todos os campos.");
    }
  };

  return (
    <section id="contato" className="contato-section text-center hidden">
      <h1 className="h1-contato text-uppercase">Contact Me</h1>
      <div className="contato-container">
        <form
          className="form-contato d-flex flex-column"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="nome"
            placeholder="Your name"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="mensagem"
            rows="5"
            placeholder="Your message..."
            value={formData.mensagem}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>

        <div className="info-contato">
          <p>
            <strong>My E-mail:</strong> Duarte.dev@outlook.com
          </p>
          <p>
            <strong>My Phone:</strong> (31) 99945-0717
          </p>
        </div>
      </div>

      {/* feedback da submissão */}
      {feedback && <p id="feedback">{feedback}</p>}
    </section>
  );
}

export default Contact;
