import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Simple routing system without react-router
function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState('catalog'); // catalog | product | cart | categories | account | login | register
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product');
  };

  const handleViewCart = () => {
    setCurrentView('cart');
  };

  const handleViewCategories = () => {
    setCurrentView('categories');
  };

  const handleViewAccount = () => {
    setCurrentView('account');
  };

  const handleBackToCatalog = (categoryId = null) => {
    setSelectedCategory(categoryId);
    setCurrentView('catalog');
    setSelectedProductId(null);
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  // Mostrar loading mientras se verifica autenticación
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '1.2rem',
        color: '#667eea'
      }}>
        Cargando...
      </div>
    );
  }

  // Si no está autenticado, mostrar login o register
  if (!isAuthenticated) {
    if (currentView === 'register') {
      return <RegisterPage onSwitchToLogin={handleSwitchToLogin} />;
    }
    return <LoginPage onSwitchToRegister={handleSwitchToRegister} />;
  }

  // Si está autenticado, mostrar la aplicación normal
  return (
    <MainLayout 
      onViewCart={handleViewCart}
      onViewCategories={handleViewCategories}
      onViewAccount={handleViewAccount}
      onViewCatalog={() => handleBackToCatalog()}
      currentView={currentView}
    >
      {currentView === 'catalog' && <CatalogPage key="catalog" onViewProduct={handleViewProduct} selectedCategory={selectedCategory} />}
      {currentView === 'product' && <ProductDetailPage key={selectedProductId} productId={selectedProductId} onBack={handleBackToCatalog} />}
      {currentView === 'cart' && <CartPage key="cart" onBack={handleBackToCatalog} />}
      {currentView === 'categories' && <CategoriesPage key="categories" onSelectCategory={handleBackToCatalog} />}
      {currentView === 'account' && <AccountPage key="account" />}
    </MainLayout>
  );
}

export default App;
