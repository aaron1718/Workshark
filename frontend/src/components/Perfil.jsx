import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/Perfil.css';  // Importa el archivo de estilos
import NavBar from './NavBar'; // Asegúrate de importar correctamente el componente NavBar
import MisEmpleos from './MisEmpleos'; // Asegúrate de importar correctamente el componente MisEmpleos
import Footer from './Footer';


const Perfil = ({ loggedInUserEmail, onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para carga

	useEffect(() => {
	  const fetchData = async () => {
	    try {
	      console.time('Tiempo de solicitud');
	      setIsLoading(true);

	      if (loggedInUserEmail) {
	        const response = await axios.get(`http://localhost:3000/auth/find-by-email/${loggedInUserEmail}`);
	        console.log('Respuesta del servidor:', response.data);
	        setUserData(response.data);
	      } else {
	        console.error('Correo electrónico del usuario indefinido.');
	      }
	    } catch (error) {
	      console.error('Error al cargar el perfil:', error);
	    } finally {
	      setIsLoading(false);
	      console.timeEnd('Tiempo de solicitud');
	    }
	  };

	  fetchData();
	}, [loggedInUserEmail]);




  return (

  	<div>
     <NavBar onLogout={onLogout} />
    <div className="card-container">

      <h2>Perfil de Usuario</h2>
      {isLoading ? (
        <h3>Cargando perfil...</h3>
      ) : (
        userData ? (
          <div className="profile-info">
            {userData.urlfoto && <img src={userData.urlfoto} alt="Foto de perfil" className="profile-image" />}
            <hr/>
            <div className="letras">
	            <p><strong>Username:</strong> {userData.username}</p>
	            <p><strong>Email:</strong> {userData.email}</p>
            </div>

          </div>
        ) : (
          <h3>No se pudo cargar el perfil</h3>
        )
      )}
    </div>
      <MisEmpleos loggedInUserEmail={loggedInUserEmail} />
      <Footer />
    </div>
    
  );
};



export default Perfil;
