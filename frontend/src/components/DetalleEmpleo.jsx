import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './style/DetalleEmpleo.css';
import NavBar from './NavBar';
import Footer from './Footer';

const DetalleEmpleo = ({ loggedInUserEmail, onLogout }) => {
  const { empleoId } = useParams();
  const [empleo, setEmpleo] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [loading, setLoading] = useState(true);
  const [esCreador, setEsCreador] = useState(false);
  const [editarFormularioAbierto, setEditarFormularioAbierto] = useState(false);

  // Nuevo estado para los campos de edición
  const [formularioEdicion, setFormularioEdicion] = useState({
    titulo: '',
    descripcion: '',
    salario: '',
    // Agrega otros campos de edición según sea necesario
  });

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDetallesEmpleo = async () => {
      try {
        const response = await Axios.get(`http://localhost:3000/empleos/${empleoId}`);
        setEmpleo(response.data);
        setFormularioEdicion(response.data); // Inicializa el estado del formulario con los detalles actuales del empleo
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los detalles del empleo:', error);
        setLoading(false);
      }
    };

    const obtenerComentarios = async () => {
      try {
        const response = await Axios.get(`http://localhost:3000/comentarios/${empleoId}`);
        setComentarios(response.data.comentarios);
      } catch (error) {
        console.error('Error al obtener comentarios:', error);
      }
    };

    obtenerDetallesEmpleo();
    obtenerComentarios();
  }, [empleoId]);

  const handleComentarioChange = (event) => {
    setNuevoComentario(event.target.value);
  };

  const handleAgregarComentario = async () => {
    try {
      const response = await Axios.post('http://localhost:3000/comentarios', {
        comentario: nuevoComentario,
        userEmail: loggedInUserEmail,
        empleoId: empleoId,
      });

      console.log('Respuesta al agregar comentario:', response.data);

      const comentarioNuevo = {
        comentarioId: response.data.comentarioId,
        comentario: response.data.comentario,
        userEmail: loggedInUserEmail,
      };

      setComentarios([...comentarios, comentarioNuevo]);
      setNuevoComentario('');
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  const handleEditarEmpleo = async () => {
    try {
      // Aquí debes enviar los cambios al servidor utilizando Axios
      await Axios.put(`http://localhost:3000/empleos/${empleoId}`, formularioEdicion);
      

      // Después de editar, cierra el formulario de edición
      setEditarFormularioAbierto(false);
      window.location.reload();

    } catch (error) {
      console.error('Error al editar empleo:', error);
    }
  };

  const handleEditarEmpleoClick = () => {
    setEditarFormularioAbierto(true);
  };

  const handleFormularioEdicionChange = (event) => {
    // Actualiza el estado del formulario de edición al escribir en los campos
    setFormularioEdicion({ ...formularioEdicion, [event.target.name]: event.target.value });
  };

  const handleEliminarEmpleo = async () => {
    try {
      await Axios.delete(`http://localhost:3000/empleos/${empleoId}`);
      // Después de eliminar el empleo, redirige a la página de empleos o a donde desees
      navigate('/empleos');
    } catch (error) {
      console.error('Error al eliminar empleo:', error);
    }
  };

  if (loading) {
    return <p>Cargando detalles del empleo...</p>;
  }

  return (
    <div>
      <NavBar onLogout={onLogout} />

      {empleo ? (
        <div className="detalle-empleo-container">
          <h2 className="detalle-empleo-title">Detalles del Empleo</h2>
          <h3>{empleo.titulo}</h3>
          <p className="detalle-empleo-description">{empleo.descripcion}</p>
          <p className="detalle-empleo-salary">Salario: $ {empleo.salario}</p>
          <img className="detalle-empleo-image" src={empleo.urlfoto} alt="Imagen del empleo" />
          {loggedInUserEmail === empleo.userEmailCreator && (
            <>
              <button className="boton-editar" onClick={handleEditarEmpleoClick}>
                Editar Empleo
              </button>

              <button className="boton-eliminar" onClick={handleEliminarEmpleo}>
                Eliminar Empleo
              </button>
            </>

          )}
          <div className="comentarios-container">
            <h3>Comentarios</h3>
            {comentarios.length > 0 && comentarios.map((comentario) => (
              <div key={comentario.comentarioId} className="comentario-container">
                <p className="comentario-text">{comentario.comentario}</p>
                <p className="usuario-info">Usuario: {comentario.userEmail}</p>
              </div>
            ))}
          </div>
          {editarFormularioAbierto && (
            <div className="form-modif">
            <form>
                <label htmlFor="titulo">Título:</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formularioEdicion.titulo}
                  onChange={handleFormularioEdicionChange}
                />

                <label htmlFor="descripcion">Descripción:</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formularioEdicion.descripcion}
                  onChange={handleFormularioEdicionChange}
                />

                <label htmlFor="salario">Salario:</label>
                <input
                  type="text"
                  id="salario"
                  name="salario"
                  value={formularioEdicion.salario}
                  onChange={handleFormularioEdicionChange}
                />

              <button className="button" onClick={handleEditarEmpleo}>Guardar cambios</button>
              <button className="button-cancelar" onClick={() => setEditarFormularioAbierto(false)}>
                Cancelar
              </button>
            </form>
            </div>
          )}
          <div className="nuevo-comentario-container">
            <h3>Agregar Comentario</h3>
            <textarea
              rows="4"
              cols="50"
              value={nuevoComentario}
              onChange={handleComentarioChange}
              placeholder="Escribe tu comentario aquí..."
            />
            <button className="button" onClick={handleAgregarComentario}>
              Agregar Comentario
            </button>
          </div>
        </div>
      ) : (
        <p>No se encontró información del empleo.</p>
      )}
      <Footer />
    </div>
  );
};

export default DetalleEmpleo;
