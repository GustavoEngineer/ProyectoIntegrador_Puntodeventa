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
  const [searchQuery, setSearchQuery] = useState('');

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
    // If categoryId is an event (has stopPropagation/preventDefault or simple check), treat as null
    // Better check: if it's an object with 'target' property, it's likely an event.
    // Or just check if it's NOT a string/number if your categories are IDs.
    // Safest for this bug: check if it has preventDefault
    const actualCategory = (categoryId && typeof categoryId === 'object' && categoryId.preventDefault) ? null : categoryId;

    setSelectedCategory(actualCategory);
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
  // Si no está autenticado, mostrar login o register SOLO SI es la vista actual
  if (!isAuthenticated && (currentView === 'login' || currentView === 'register')) {
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
      onSearch={setSearchQuery}
      searchQuery={searchQuery}
    >
      {currentView === 'catalog' && (
        <CatalogPage
          key="catalog"
          onViewProduct={handleViewProduct}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onSelectCategory={handleBackToCatalog}
        />
      )}
      {currentView === 'product' && <ProductDetailPage key={selectedProductId} productId={selectedProductId} onBack={handleBackToCatalog} />}
      {currentView === 'cart' && <CartPage key="cart" onBack={handleBackToCatalog} />}
      {currentView === 'categories' && <CategoriesPage key="categories" onSelectCategory={handleBackToCatalog} />}
      {currentView === 'account' && <AccountPage key="account" />}
    </MainLayout>
  );
}

export default App;
