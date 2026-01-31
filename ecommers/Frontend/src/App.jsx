import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { BreadcrumbProvider } from './context/BreadcrumbContext'; // Import BreadcrumbProvider
import MainLayout from './components/layout/MainLayout';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CategoriesPage from './pages/CategoriesPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';

// Simple routing system without react-router
function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState('catalog'); // catalog | product | cart | categories | account | login | register
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle auth state changes
  useEffect(() => {
    if (isLoading) return;

    // If logged in and on auth pages, go to catalog
    if (isAuthenticated && (currentView === 'login' || currentView === 'register')) {
      setCurrentView('catalog');
    }

    // If logged out and on protected pages, go to catalog
    const protectedViews = ['cart', 'account', 'favorites'];
    if (!isAuthenticated && protectedViews.includes(currentView)) {
      setCurrentView('catalog');
    }
  }, [isAuthenticated, currentView, isLoading]);

  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product');
  };

  const handleRequireAuth = () => {
    // Optional: save return path if needed
    handleSwitchToLogin();
  };

  const handleViewCart = () => {
    if (!isAuthenticated) {
      handleRequireAuth();
      return;
    }
    setCurrentView('cart');
  };

  const handleViewCategories = () => {
    setCurrentView('categories');
  };

  const handleViewAccount = () => {
    if (!isAuthenticated) {
      handleRequireAuth();
      return;
    }
    setCurrentView('account');
  };

  const handleViewFavorites = () => {
    if (!isAuthenticated) {
      handleRequireAuth();
      return;
    }
    setCurrentView('favorites');
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

  // Breadcrumb Navigation Handler
  const handleBreadcrumbNavigate = (item) => {
    console.log('Navigating via breadcrumb:', item);
    switch (item.type) {
      case 'catalog':
        handleBackToCatalog();
        break;
      case 'cart':
        handleViewCart();
        break;
      case 'favorites':
        handleViewFavorites();
        break;
      case 'product':
        if (item.id) handleViewProduct(item.id);
        break;
      case 'account':
        handleViewAccount();
        break;
      case 'category':
        // Pass object to preserve breadcrumb name in CatalogPage
        handleBackToCatalog({ Id_CategoriaPieza: item.id, Descripcion: item.label });
        break;
      default:
        console.warn('Unknown breadcrumb type:', item.type);
        handleBackToCatalog();
    }
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
    <BreadcrumbProvider onNavigate={handleBreadcrumbNavigate}>
      <MainLayout
        onViewCart={handleViewCart}
        onViewCategories={handleViewCategories}
        onViewAccount={handleViewAccount}
        onViewCatalog={handleBackToCatalog}
        onViewFavorites={handleViewFavorites}
        currentView={currentView}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      >
        {currentView === 'catalog' && (
          <CatalogPage
            key={`catalog-${isAuthenticated}`}
            onViewProduct={handleViewProduct}
            selectedCategory={selectedCategory}

            searchQuery={searchQuery}
            onSelectCategory={handleBackToCatalog}
            onRequireLogin={handleRequireAuth}
          />
        )}
        {currentView === 'product' && <ProductDetailPage key={selectedProductId} productId={selectedProductId} onBack={handleBackToCatalog} onViewProduct={handleViewProduct} onRequireLogin={handleRequireAuth} />}
        {currentView === 'cart' && <CartPage key="cart" onBack={handleBackToCatalog} />}
        {currentView === 'categories' && <CategoriesPage key="categories" onSelectCategory={handleBackToCatalog} />}
        {currentView === 'account' && <AccountPage key="account" />}
        {currentView === 'favorites' && <FavoritesPage key="favorites" onViewProduct={handleViewProduct} onBack={handleBackToCatalog} />}
      </MainLayout>
    </BreadcrumbProvider>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <AppContent />
    </FavoritesProvider>
  );
}

export default App;
