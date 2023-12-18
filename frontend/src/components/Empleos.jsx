import React, { useState } from 'react';
import NavBar from './NavBar'; // Asegúrate de importar correctamente el componente NavBar
import Axios from 'axios';
import './style/Empleos.css'; // Enlaza el archivo CSS
import * as Yup from 'yup';
import Footer from './Footer';

const empleoSchema = Yup.object().shape({
  titulo: Yup.string().required('El título del empleo es obligatorio'),
  descripcion: Yup.string().required('La descripción del empleo es obligatoria'),
  salario: Yup.number().typeError('El salario debe ser un número válido').required('El salario es obligatorio'),
  urlfoto: Yup.string().url('La URL de la foto no es válida').required('La foto es obligatorio'),
});

const EmpleoForm = ({ onLogout, loggedInUserEmail  }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [salario, setSalario] = useState('');
  const [urlfoto, setUrlFoto] = useState(''); // Asegúrate de tener este estado si decides incluirlo en el formulario
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await empleoSchema.validate({ titulo, descripcion, salario, urlfoto });

      const response = await Axios.post('http://localhost:3000/empleos', {
        titulo,
        descripcion,
        salario,
        urlfoto,
        userEmailCreator: loggedInUserEmail, // Incluye el campo de la URL de la foto si decides incluirlo
      });

      alert('Empleo creado exitosamente');

      console.log('Empleo creado:', response.data);
      window.location.reload();

      // Puedes realizar otras acciones después de la creación exitosa
         } catch (error) {
        if (Yup.ValidationError.isError(error)) {
          // Manejar errores de validación específicos de Yup
          console.error('Error de validación del formulario:', error);
          console.log('Mensaje de error específico:', error.errors); // Añade esta línea
          setError(`Error de validación: ${error.errors[0]}`);
        } else {
          // Manejar otros errores, mostrar mensajes, etc.
          console.error('Error al crear el empleo:', error);
          alert('Error al crear el empleo');
        }
      }

  };

  return (
    <div>
        <div className="formulario-empleo">

      <NavBar onLogout={onLogout} />
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Crear Empleo</h2>
            <h3>Título del empleo:</h3>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>

          <div className="form-section">
            <h3>Descripción del empleo:</h3>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </div>

          <div className="form-section">
            <h3>Salario:</h3>
            <input type="text" value={salario} onChange={(e) => setSalario(e.target.value)} />
          </div>

          <div className="form-section">
            <h3>URL de la foto (opcional):</h3>
            <input type="text" value={urlfoto} onChange={(e) => setUrlFoto(e.target.value)} />
           </div>
            {error && <h4 style={{ color: 'red' }}>{error}</h4>}
          <button className="button">Crear Empleo</button>
        </form>

    </div>
    <Footer />

        </div>


  );
};

export default EmpleoForm;
