// src/components/Inicio.js
import NavBar from './NavBar';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/Inicio.css';

const Inicio = ({ onLogout }) => {
  const [empleos, setEmpleos] = useState([]);

  useEffect(() => {
    // Hacer la solicitud GET a la API
    fetch('http://localhost:3000/empleos')
      .then(response => response.json())
      .then(data => setEmpleos(data))
      .catch(error => console.error('Error al obtener empleos:', error));
  }, []); // El segundo argumento [] asegura que useEffect solo se ejecute una vez (equivalente a componentDidMount)

  return (
  <div className="container-inicio">
      <NavBar onLogout={onLogout} />
      <div className="titulo">
        <h1>Bienvenido a Workshark</h1>
        <h2>Listado de Empleos</h2>
      </div>
      <div className="empleos-list">
        <div className="empleos-cards">
          {empleos.map(empleo => (
            <div key={empleo.empleoId} className="empleo-card">
              <h3>{empleo.titulo}</h3>
              <p>{empleo.descripcion}</p>
              <p>Salario: {empleo.salario}</p>
              <Link className="link-empleo" to={`/detalle-empleo/${empleo.empleoId}`}>Ver Detalles</Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Inicio;
