import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      if (!formData.email || !formData.password) {
        throw new Error('Por favor completa todos los campos');
      }

      await login(formData.email, formData.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Section - Image/Branding (White Background) */}
      <div className="login-image-section">
        <div className="brand-content">
          <div className="logo-section">
            <span className="logo-icon">🏥</span>
            <h1>MediParts</h1>
          </div>
          <p className="brand-tagline">Gestión inteligente de insumos médicos</p>
          {/* Placeholder for illustration if needed */}
          <div className="brand-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-square"></div>
          </div>
        </div>
      </div>

      {/* Right Section - Form (Gradient Background) */}
      <div className="login-form-section">
        <div className="login-card">
          <div className="login-header">
            <h2>Bienvenido</h2>
            <p>Accede a tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
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
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark">Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="login-footer">
            <p>¿No tienes una cuenta?</p>
            <button
              onClick={onSwitchToRegister}
              className="switch-button"
              disabled={isLoading}
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
