// NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style/NavBar.css'; // Asegúrate de importar tus estilos
import imagen from '../icon/Workshark.png';

const NavBar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Realiza el logout (puedes mantener tu función onLogout)
    onLogout();
    
    // Redirige a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <nav className="navbar-container">
      <img src={imagen} alt="Logo" className="logo" />
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/inicio" className="button-nav">Inicio</Link>
        </li>
        <li className="nav-item">
          <Link to="/empleos" className="button-nav">Publicar</Link>
        </li>
        <li className="red-button" onClick={handleLogout}>
          Cerrar sesión
        </li>
        <li className="nav-item">
          <Link to="/perfil" className="button-perfil">Perfil</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
