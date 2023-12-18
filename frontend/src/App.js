import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Inicio from './components/Inicio';
import Empleos from './components/Empleos';
import Perfil from './components/Perfil';
import Detalle from './components/DetalleEmpleo';


function App() {
  // Recupera la información de inicio de sesión desde localStorage al cargar la aplicación
  const storedUserEmail = localStorage.getItem('loggedInUserEmail');
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedUserEmail);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(storedUserEmail);

  const handleLogin = (userEmail) => {
    setIsAuthenticated(true);
    setLoggedInUserEmail(userEmail);
    // Almacena el correo electrónico del usuario en localStorage al iniciar sesión
    localStorage.setItem('loggedInUserEmail', userEmail);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedInUserEmail(null);

    // Elimina la información de inicio de sesión de localStorage al cerrar sesión
    localStorage.removeItem('loggedInUserEmail');
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? (
      element
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registro" element={<Register />} />

        <Route
          path="/empleos"
          element={<PrivateRoute element={<Empleos loggedInUserEmail={loggedInUserEmail} onLogout={handleLogout}/>} />}
        />

        <Route
          path="/inicio"
          element={<PrivateRoute element={<Inicio onLogout={handleLogout} />} />}
        />

        <Route
          path="/perfil"
        element={<PrivateRoute element={<Perfil loggedInUserEmail={loggedInUserEmail} onLogout={handleLogout} />}/>}
        />

        <Route
          path="/detalle-empleo/:empleoId"
          element={<Detalle loggedInUserEmail={loggedInUserEmail} onLogout={handleLogout} />}/>}
        />

        <Route index element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
