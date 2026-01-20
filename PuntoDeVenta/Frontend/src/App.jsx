import React from 'react';
import MainLayout from './components/layout/MainLayout';
import CatalogPage from './pages/CatalogPage';

// In a real app, we would use react-router-dom here.
// For this base implementation, we'll render the Catalog directly within the Layout.

function App() {
  return (
    <MainLayout>
      <CatalogPage />
    </MainLayout>
  );
}

export default App;
