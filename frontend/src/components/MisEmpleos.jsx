// components/MisEmpleos.js
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const MisEmpleos = ({ loggedInUserEmail }) => {
  const [empleos, setEmpleos] = useState([]);

  useEffect(() => {
    const obtenerEmpleosPorUsuario = async () => {
      try {
        const response = await Axios.get(`http://localhost:3000/empleos/find-by-email/${loggedInUserEmail}`);
        setEmpleos(response.data);
      } catch (error) {
        console.error('Error al obtener los empleos por usuario:', error);
        // Manejar errores, mostrar mensajes, etc.
      }
    };

    obtenerEmpleosPorUsuario();
  }, [loggedInUserEmail]);

  return (
    <div>
      <div className="empleos-list">
      <div className="titulo">
        <h2>Mis Empleos</h2>
      </div>
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
    </div>

  );
};

export default MisEmpleos;
