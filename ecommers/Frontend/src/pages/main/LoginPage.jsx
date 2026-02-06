import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';
import RhombusLogo from '../../components/3d/RhombusLogo';

const LoginPage = ({ onSwitchToRegister, onBack }) => {
  const { login } = useAuth();
  // const navigate = useNavigate(); // No longer needed for back button if using onBack prop, but leaving import might be safe if other things use it. Actually, cleaner to remove if unused.
  // But wait, removing useNavigate might break if I don't remove import. 
  // Let's just ignore navigate for the back button.
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      {/* Back Button */}
      <button className="back-nav-floating" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Volver
      </button>

      {/* Left Section - Image/Branding (White Background) */}
      <div className="login-image-section">
        <div className="brand-content">
          <div className="logo-section">
            <div style={{ width: '140px', height: '140px' }}>
              <RhombusLogo />
            </div>
            <h1>MediParts</h1>
          </div>
          <p className="brand-tagline">Gestión inteligente de insumos médicos</p>
          <div className="brand-decoration">
            <div className="decoration-circle"></div>
            <div className="decoration-square"></div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
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
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark">Recordarme</span>
              </label>
              <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
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
