import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './style/Register.css'; // Asegúrate de importar los estilos

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('El nombre de usuario es obligatorio'),
  email: Yup.string().email('Introduce un email válido').required('El email es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
  urlfoto: Yup.string().url('La URL de la foto no es válida').required('La foto es obligatoria'),
});

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      urlfoto: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', values);

        console.log(response.data);
        // Manejar la respuesta, por ejemplo, redirigir al usuario a la página de inicio de sesión
        navigate('/login');
      } catch (error) {
        console.error(error);
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
      }
    },
  });

  return (
    <div className="container">
      <h2>Registro</h2>

      <form onSubmit={formik.handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Nombre de usuario"
          id="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="error-message">{formik.errors.username}</p>
        )}

        <input
          className="input"
          type="email"
          placeholder="Correo electrónico"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="error-message">{formik.errors.email}</p>
        )}

        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="error-message">{formik.errors.password}</p>
        )}

        <input
          className="input"
          type="text"
          placeholder="URL de la foto"
          id="urlfoto"
          name="urlfoto"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.urlfoto}
        />
        {formik.touched.urlfoto && formik.errors.urlfoto && (
          <p className="error-message">{formik.errors.urlfoto}</p>
        )}

        <button className="button" type="submit">
          Registrarse
        </button>
      </form>

      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Register;
