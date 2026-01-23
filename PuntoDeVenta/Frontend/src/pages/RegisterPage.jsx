import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './RegisterPage.css';

const RegisterPage = ({ onSwitchToLogin }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    paternalSurname: '',
    maternalSurname: '',
    phone: '',
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
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validar campos requeridos (Apellido Materno y Telefono pueden ser opcionales según reglas, pero el usuario los pidió explícitamente)
      if (!formData.name || !formData.paternalSurname || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
        throw new Error('Por favor completa todos los campos requeridos');
      }

      if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
        throw new Error('Solo se permiten correos de Gmail (@gmail.com)');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (formData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      await register({
        name: formData.name,
        paternalSurname: formData.paternalSurname,
        maternalSurname: formData.maternalSurname,
        phone: formData.phone,
        email: formData.email,
        password: formData.password
      });

    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Left Section - Branding */}
      <div className="register-image-section">
        <div className="brand-content">
          <div className="logo-section">
            <span className="logo-icon">🏥</span>
            <h1>MediParts</h1>
          </div>
          <p className="brand-tagline">Únete a la gestión inteligente de insumos</p>
          <div className="brand-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-square"></div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="register-form-section">
        <div className="register-card">
          <div className="register-header">
            <h2>Crear Cuenta</h2>
            <p>Regístrate para comenzar</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {error && (
              <div className="error-message">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Juan"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="55 1234 5678"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="paternalSurname">Apellido Paterno</label>
                <input
                  type="text"
                  id="paternalSurname"
                  name="paternalSurname"
                  value={formData.paternalSurname}
                  onChange={handleChange}
                  placeholder="Pérez"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="maternalSurname">Apellido Materno</label>
                <input
                  type="text"
                  id="maternalSurname"
                  name="maternalSurname"
                  value={formData.maternalSurname}
                  onChange={handleChange}
                  placeholder="López"
                  disabled={isLoading}
                />
              </div>
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

            <div className="form-row">
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
                <label htmlFor="confirmPassword">Confirmar</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repetir"
                  required
                  disabled={isLoading}
                />
              </div>
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
    </div>
  );
};

export default RegisterPage;
