import React, { useState, useEffect } from 'react';
import { useAuth } from './components/layout/body/main/context/AuthContext';
import { FavoritesProvider } from './components/layout/Header/usersections/favorites/context/FavoritesContext';
import { BreadcrumbProvider } from './components/layout/body/main/context/BreadcrumbContext';

// Nuevo navbar unificado
import Topbar from './components/layout/Header/topbar/Topbar';

// Layouts


// Pages
import CatalogScreen from './components/layout/body/catalogscreen/CatalogScreen';
import ProductDetailPage from './components/layout/body/main/ProductDetailPage';
import CartPage from './components/layout/Header/usersections/shopping-cart/CartPage';
import AccountPage from './components/layout/Header/usersections/settings/AccountPage';
import LoginPage from './components/layout/body/main/LoginPage';
import RegisterPage from './components/layout/body/main/RegisterPage';
import FavoritesPage from './components/layout/Header/usersections/favorites/FavoritesPage';


// Hero section for home
import HeroSection from './components/3dmodel/HeroSection';
import CatalogIntroduction from './components/layout/body/mainscreen/promotionsection/CatalogIntroduction';
import PromotionDevice from './components/layout/body/mainscreen/promotionsection/PromotionDevice';
import CategorySection from './components/layout/body/mainscreen/categorysection/CategorySection'; // Import CategorySection
import Deals from './components/layout/body/mainscreen/quickviewproducts/Deals'; // Import Deals Carousel
import ForYou from './components/layout/body/mainscreen/quickviewproducts/ForYou'; // Import ForYou Section
// Footer
import Footer from './components/layout/footer/Footer';
// Styles
import './components/App.css';

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
    setCurrentView('catalog');
    setSelectedProductId(null);
  };

  const handleViewCatalog = () => {
    setCurrentView('catalog');
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      case 'home':
        handleViewHome();
        break;
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
      case 'catalog':
        return (
          <CatalogScreen
            onViewProduct={handleViewProduct}
            selectedCategory={selectedCategory}
            selectedEquipo={selectedEquipo}
            searchQuery={searchQuery}
            onRequireLogin={handleRequireAuth}
          />
        );
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
        <Topbar
          onViewCart={handleViewCart}
          onViewFavorites={handleViewFavorites}
          onViewCatalog={handleViewCatalog}
          onViewAccount={handleViewAccount}
          currentView={currentView}
          onSearch={setSearchQuery}
          onSearchSubmit={() => {
            setCurrentView('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          searchQuery={searchQuery}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setCurrentView('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          selectedCategory={selectedCategory}
        />

        {/* Home view - Hero + Catalog */}
        {!isSubPage && (
          <>
            {/* <HeroSection
              onLoginClick={handleSwitchToLogin}
              onViewCart={handleViewCart}
              onViewFavorites={handleViewFavorites}
              onSearch={setSearchQuery}
              searchQuery={searchQuery}
            /> */}

            <div className="promotion-section-container">
              <CatalogIntroduction />
              <PromotionDevice onSelectEquipo={(equipo) => {
                setSelectedEquipo(equipo);
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} />
            </div>

            {/* New Category Section */}
            <CategorySection onSelectCategory={(category) => {
              setSelectedCategory(category);
              setCurrentView('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />

            {/* Deals Carousel */}
            <Deals
              onViewProduct={(id) => {
                setSelectedProductId(id);
                setCurrentView('product');
              }}
              onRequireLogin={handleRequireAuth}
            />

            {/* For You Section */}
            <ForYou
              onViewProduct={(id) => {
                setSelectedProductId(id);
                setCurrentView('product');
              }}
              onRequireLogin={handleRequireAuth}
            />


          </>
        )}

        {/* Sub-pages (cart, favorites, product detail, etc.) */}
        {isSubPage && subPageContent && (
          <div className="page-content">
            {subPageContent}
          </div>
        )}

        {/* Footer */}
        <Footer />
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
