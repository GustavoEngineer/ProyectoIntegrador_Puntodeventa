import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Cuenta de administrador predefinida
const ADMIN_ACCOUNT = {
  id: 'admin-001',
  name: 'Dr. Roberto Aguirre',
  email: 'roberto.aguirre@gmail.com',
  password: 'BioMed2026!',
  role: 'Administrador del Sistema',
  company: 'Hospital General de Mérida',
  department: 'Dirección de Ingeniería Biomédica',
  phone: '+52 999 456 7890',
  address: 'Calle 59 #500, Centro, Mérida, Yucatán',
  isAdmin: true,
  createdAt: '2025-01-01T00:00:00.000Z',
  orders: [
    {
      id: 'ORD-2026-001',
      date: '2026-01-15T10:00:00.000Z',
      status: 'Entregado',
      total: 12450.00,
      items: [
        { id: 1, name: 'Tubo de Rayos X Varian G-1592', price: 5200.00, quantity: 2 },
        { id: 2, name: 'Detector Digital DR Carestream DRX', price: 2050.00, quantity: 1 }
      ]
    },
    {
      id: 'ORD-2025-089',
      date: '2025-12-22T14:30:00.000Z',
      status: 'En tránsito',
      total: 5600.00,
      items: [
        { id: 3, name: 'Bobina de Resonancia Magnética Siemens', price: 5600.00, quantity: 1 }
      ]
    },
    {
      id: 'ORD-2025-067',
      date: '2025-11-10T09:15:00.000Z',
      status: 'Entregado',
      total: 8200.00,
      items: [
        { id: 4, name: 'Transductor de Ultrasonido Philips C5-2', price: 4100.00, quantity: 2 }
      ]
    }
  ]
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

  const register = (userData) => {
    // Validar que el correo sea de Gmail
    if (!userData.email.toLowerCase().endsWith('@gmail.com')) {
      throw new Error('Solo se permiten correos de Gmail');
    }

    // Validar campos requeridos
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Validar contraseña
    if (userData.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Crear usuario con datos adicionales y órdenes de demostración
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // En producción, esto debería estar hasheado
      role: 'Ingeniero Biomédico',
      company: 'Hospital General de Mérida',
      department: 'Ingeniería Biomédica',
      phone: '+52 999 123 4567',
      address: 'Calle 60 #234, Mérida, Yucatán',
      createdAt: new Date().toISOString(),
      orders: [
        {
          id: 'ORD-2026-001',
          date: '2026-01-15T10:00:00.000Z',
          status: 'Entregado',
          total: 12450.00,
          items: [
            { id: 1, name: 'Tubo de Rayos X Varian G-1592', price: 5200.00, quantity: 2 },
            { id: 2, name: 'Detector Digital DR Carestream DRX', price: 2050.00, quantity: 1 }
          ]
        },
        {
          id: 'ORD-2025-089',
          date: '2025-12-22T14:30:00.000Z',
          status: 'En tránsito',
          total: 5600.00,
          items: [
            { id: 3, name: 'Bobina de Resonancia Magnética Siemens', price: 5600.00, quantity: 1 }
          ]
        },
        {
          id: 'ORD-2025-067',
          date: '2025-11-10T09:15:00.000Z',
          status: 'Entregado',
          total: 8200.00,
          items: [
            { id: 4, name: 'Transductor de Ultrasonido Philips C5-2', price: 4100.00, quantity: 2 }
          ]
        }
      ]
    };

    setUser(newUser);
    return newUser;
  };

  const login = (email, password) => {
    // Verificar si es la cuenta de administrador
    if (email === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
      setUser(ADMIN_ACCOUNT);
      return ADMIN_ACCOUNT;
    }

    // En un entorno real, esto verificaría con el backend
    const storedUser = localStorage.getItem('mediparts_user');
    
    if (!storedUser) {
      throw new Error('No existe una cuenta con este correo');
    }

    const userData = JSON.parse(storedUser);

    if (userData.email !== email) {
      throw new Error('Correo incorrecto');
    }

    if (userData.password !== password) {
      throw new Error('Contraseña incorrecta');
    }

    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mediparts_user');
  };

  const updateProfile = (updates) => {
    if (!user) {
      throw new Error('No hay usuario autenticado');
    }

    // No permitir cambiar email, id, password desde aquí
    const { email, id, password, ...allowedUpdates } = updates;

    const updatedUser = {
      ...user,
      ...allowedUpdates
    };

    setUser(updatedUser);
    return updatedUser;
  };

  const changePassword = (currentPassword, newPassword) => {
    if (!user) {
      throw new Error('No hay usuario autenticado');
    }

    if (user.password !== currentPassword) {
      throw new Error('La contraseña actual es incorrecta');
    }

    if (newPassword.length < 6) {
      throw new Error('La nueva contraseña debe tener al menos 6 caracteres');
    }

    const updatedUser = {
      ...user,
      password: newPassword
    };

    setUser(updatedUser);
    return updatedUser;
  };

  const addOrder = (order) => {
    if (!user) {
      throw new Error('No hay usuario autenticado');
    }

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
