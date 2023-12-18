import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './style/Login.css';
import imagen from '../icon/Workshark.png';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Introduce un email válido').required('El email es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
});

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Nuevo estado para el mensaje de error

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', values);

        onLogin(values.email);  // Asegúrate de pasar el email al evento onLogin
        navigate('/inicio');
      } catch (error) {
        console.error(error);
          setError('Email o contraseña incorrectos.');

      }
    },
  });

  return (
    <div className="container">
      <img src={imagen} className="logo-login" alt="Logo" />
      <h2>Iniciar sesión</h2>

      <form onSubmit={formik.handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Email"
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
        <button className="button" type="submit">
          Iniciar sesión
        </button>

      </form>
      <br/>
              {error && <p className="error-message">{error}</p>}

      <p>
        ¿No tienes una cuenta? <Link to="/registro">Registrarse</Link>
      </p>
    </div>
  );
};

export default Login;
