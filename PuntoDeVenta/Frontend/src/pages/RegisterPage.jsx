import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './RegisterPage.css';

const RegisterPage = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validar campos
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('Por favor completa todos los campos');
      }

      // Validar que sea Gmail
      if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
        throw new Error('Solo se permiten correos de Gmail (@gmail.com)');
      }

      // Validar que las contraseñas coincidan
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      // Validar longitud de contraseña
      if (formData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // El usuario se loguea automáticamente después del registro
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="logo-section">
            <span className="logo-icon">🏥</span>
            <h1>MediParts</h1>
          </div>
          <h2>Crear Cuenta</h2>
          <p>Regístrate para acceder a piezas médicas</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {error && (
            <div className="error-message">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ing. Juan Pérez"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo de Gmail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu.correo@gmail.com"
              required
              disabled={isLoading}
            />
            <small className="input-hint">Solo se permiten correos de Gmail</small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="register-footer">
          <p>¿Ya tienes una cuenta?</p>
          <button 
            onClick={onSwitchToLogin}
            className="switch-button"
            disabled={isLoading}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
