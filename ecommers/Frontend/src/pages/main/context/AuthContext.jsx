import { createContext, useContext, useState, useEffect } from 'react';
import { apiCall } from '../../../utils/api';

const AuthContext = createContext();

// Estructura de usuario por defecto para mantener compatibilidad con UI
const DEFAULT_USER_STRUCTURE = {
  orders: [],
  role: 'Cliente',
  phone: '',
  address: '',
  company: '',
  department: ''
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('mediparts_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        localStorage.removeItem('mediparts_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem('mediparts_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mediparts_user');
    }
  }, [user]);

  const register = async (userData) => {
    try {
      // Validar que el correo sea de Gmail (regla de negocio existente)
      if (!userData.email.toLowerCase().endsWith('@gmail.com')) {
        throw new Error('Solo se permiten correos de Gmail');
      }

      // Prepare payload for backend
      // Backend expects: Correo, Contraseña, Nombre, A_Paterno, A_Materno, Telefono, Id_TipoUsuario
      const backendPayload = {
        Correo: userData.email,
        Contraseña: userData.password,
        Nombre: userData.name,
        A_Paterno: userData.paternalSurname || '',
        A_Materno: userData.maternalSurname || '',
        Telefono: userData.phone || '',
        Id_TipoUsuario: 2 // Por defecto Cliente
      };

      const response = await apiCall('/usuarios', {
        method: 'POST',
        body: JSON.stringify(backendPayload)
      });

      // Mapear respuesta del backend a estructura de frontend
      const newUser = {
        id: response.Id_Usuario,
        name: `${response.Nombre} ${response.A_Paterno || ''}`,
        email: response.Correo,
        password: response.Contraseña,
        createdAt: new Date().toISOString(),
        ...DEFAULT_USER_STRUCTURE,
        role: [1, 4, 5, 6, 7, 8].includes(Number(response.Id_TipoUsuario)) ? 'Administrador' : 'Ingeniero Biomédico'
      };

      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await apiCall('/usuarios/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      // Mapear respuesta del backend a estructura de frontend
      const userData = {
        id: response.Id_Usuario,
        name: `${response.Nombre} ${response.A_Paterno || ''}`,
        email: response.Correo,
        password: response.Contraseña,
        ...DEFAULT_USER_STRUCTURE,
        // Check for multiple admin IDs based on DB table
        role: [1, 4, 5, 6, 7, 8].includes(Number(response.Id_TipoUsuario)) ? 'Administrador' : 'Ingeniero Biomédico',
        // Si el backend retornara estos datos, los usaríamos
        phone: response.Telefono || DEFAULT_USER_STRUCTURE.phone
      };

      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mediparts_user');
  };

  // Actualizar perfil conectando con la API
  const updateProfile = async (updates) => {
    if (!user) {
      throw new Error('No hay usuario autenticado');
    }

    try {
      // Mapear campos de frontend a backend (PascalCase)
      const backendPayload = {};
      if (updates.name) {
        // Intentar separar nombre y apellido si viene junto, o mandar todo a nombre si es simple
        const parts = updates.name.split(' ');
        backendPayload.Nombre = parts[0];
        if (parts.length > 1) backendPayload.A_Paterno = parts.slice(1).join(' ');
      }
      if (updates.email) backendPayload.Correo = updates.email;
      if (updates.phone) backendPayload.Telefono = updates.phone;

      // Llamada PUT al backend
      const response = await apiCall(`/usuarios/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(backendPayload)
      });

      // Actualizar estado local con la respuesta o fusionando cambios
      // Nota: El backend retorna el usuario actualizado

      const updatedUser = {
        ...user,
        name: `${response.Nombre} ${response.A_Paterno || ''}`.trim(),
        email: response.Correo,
        phone: response.Telefono || user.phone
      };

      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Cambiar contraseña conectando con la API
  const changePassword = async (currentPassword, newPassword) => {
    if (!user) throw new Error('No hay usuario autenticado');

    try {
      // Usamos el mismo endpoint de update pero solo mandamos la contraseña
      // NOTA: Idealmente el backend debería verificar la currentPassword antes.
      // Como el endpoint updateUsuario actual es genérico, mandamos directo la nueva.
      // En un sistema real seguro, esto requeriría un endpoint específico /change-password.

      await apiCall(`/usuarios/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify({ Contraseña: newPassword })
      });

      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };

  const addOrder = (order) => {
    if (!user) throw new Error('No hay usuario autenticado');

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'En tránsito',
      ...order
    };

    const updatedUser = {
      ...user,
      orders: [newOrder, ...(user.orders || [])]
    };

    setUser(updatedUser);
    return newOrder;
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    addOrder
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
