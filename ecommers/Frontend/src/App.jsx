import React, { useState, useEffect } from 'react';
import { useAuth } from './pages/main/context/AuthContext';
import { FavoritesProvider } from './pages/favorites/context/FavoritesContext';
import { BreadcrumbProvider } from './pages/main/context/BreadcrumbContext';

// Nuevo navbar unificado
import Navbar from './components/hero/Navbar';

// Layouts


// Pages
import CatalogPage from './pages/main/CatalogPage';
import ProductDetailPage from './pages/main/ProductDetailPage';
import CartPage from './pages/shopping-cart/CartPage';
import AccountPage from './pages/settings/AccountPage';
import LoginPage from './pages/main/LoginPage';
import RegisterPage from './pages/main/RegisterPage';
import FavoritesPage from './pages/favorites/FavoritesPage';


// Hero section for home
import HeroSection from './components/hero/HeroSection';

// Styles
import './App.css';

function AppContent() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [currentView, setCurrentView] = useState(() => localStorage.getItem('app_currentView') || 'home');
  const [selectedProductId, setSelectedProductId] = useState(() => {
    const savedId = localStorage.getItem('app_selectedProductId');
    return savedId ? Number(savedId) : null;
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEquipo, setSelectedEquipo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  // Persist Navigation State
  useEffect(() => {
    localStorage.setItem('app_currentView', currentView);
    if (selectedProductId) {
      localStorage.setItem('app_selectedProductId', selectedProductId);
    } else {
      localStorage.removeItem('app_selectedProductId');
    }
  }, [currentView, selectedProductId]);

  // Safety check for inconsistent state (e.g. refresh on product view without ID)
  useEffect(() => {
    if (currentView === 'product' && !selectedProductId) {
      setCurrentView('home');
    }
  }, [currentView, selectedProductId]);



  // Handle auth state changes
  useEffect(() => {
    if (isLoading) return;

    // If logged in and on auth pages, go back to home (not catalog)
    if (isAuthenticated && (currentView === 'login' || currentView === 'register')) {
      setCurrentView('home'); // Always stay in home to keep navbar
    }

    // If logged out and on protected pages, go to home
    const protectedViews = ['cart', 'account', 'favorites'];
    if (!isAuthenticated && protectedViews.includes(currentView)) {
      setCurrentView('home');
    }
  }, [isAuthenticated, currentView, isLoading, user?.role]);

  // Navigation Handlers
  const handleViewProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product');
  };

  const handleRequireAuth = () => {
    setCurrentView('login');
  };

  const handleViewCart = () => {
    if (!isAuthenticated) {
      handleRequireAuth();
      return;
    }
    setCurrentView('cart');
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
    const actualCategory = (categoryId && typeof categoryId === 'object' && categoryId.preventDefault) ? null : categoryId;
    setSelectedCategory(actualCategory);
    setCurrentView('home');
    setSelectedProductId(null);
  };

  const handleViewHome = () => {
    setCurrentView('home');
    setSelectedProductId(null);
    setSelectedCategory(null);
    setSelectedEquipo(null);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  // Breadcrumb Navigation Handler
  const handleBreadcrumbNavigate = (item) => {
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
        handleBackToCatalog({ Id_CategoriaPieza: item.id, Descripcion: item.label });
        break;
      default:
        handleBackToCatalog();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  // Auth pages (login/register) - no navbar
  if (!isAuthenticated && (currentView === 'login' || currentView === 'register')) {
    if (currentView === 'register') {
      return <RegisterPage onSwitchToLogin={handleSwitchToLogin} onBack={handleViewHome} />;
    }
    return <LoginPage onSwitchToRegister={handleSwitchToRegister} onBack={handleViewHome} />;
  }



  // All other views - use unified navbar + content
  const renderContent = () => {
    switch (currentView) {
      case 'product':
        return (
          <ProductDetailPage
            key={selectedProductId}
            productId={selectedProductId}
            onBack={handleBackToCatalog}
            onViewProduct={handleViewProduct}
            onRequireLogin={handleRequireAuth}
          />
        );
      case 'cart':
        return <CartPage key="cart" onBack={handleBackToCatalog} />;
      case 'account':
        return <AccountPage key="account" />;
      case 'favorites':
        return <FavoritesPage key="favorites" onViewProduct={handleViewProduct} onBack={handleBackToCatalog} />;
      case 'home':
      default:
        return null; // Catalog is rendered separately with hero
    }
  };

  // Check if we're showing a sub-page (not home)
  const isSubPage = currentView !== 'home';
  const subPageContent = renderContent();

  return (
    <BreadcrumbProvider onNavigate={handleBreadcrumbNavigate}>
      <div className="app-container">
        {/* Unified Navbar - always visible */}
        <Navbar
          isVisible={true}
          onLoginClick={handleSwitchToLogin}
          onViewCart={handleViewCart}
          onViewFavorites={handleViewFavorites}
          onViewHome={handleViewHome}

          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />

        {/* Home view - Hero + Catalog */}
        {!isSubPage && (
          <>
            <HeroSection
              onLoginClick={handleSwitchToLogin}
              onViewCart={handleViewCart}
              onViewFavorites={handleViewFavorites}
              onSearch={setSearchQuery}
              searchQuery={searchQuery}
            />

            <div id="catalog-section" className="catalog-section">
              <CatalogPage
                onViewProduct={(id) => {
                  setSelectedProductId(id);
                  setCurrentView('product');
                }}
                onSelectCategory={(category) => {
                  setSelectedCategory(category);
                  // Stay on home view for immediate filtering
                  const catalogSection = document.getElementById('catalog-section');
                  if (catalogSection) {
                    catalogSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                selectedCategory={selectedCategory} // Pass the selected category

                onSelectEquipo={(equipo) => {
                  setSelectedEquipo(equipo);
                  // Stay on home/catalog
                  const catalogSection = document.getElementById('catalog-section');
                  if (catalogSection) {
                    catalogSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                selectedEquipo={selectedEquipo}

                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </>
        )}

        {/* Sub-pages (cart, favorites, product detail, etc.) */}
        {isSubPage && subPageContent && (
          <div className="page-content">
            {subPageContent}
          </div>
        )}
      </div>
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
