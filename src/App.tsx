import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductsListPage } from './pages/ProductsListPage';
import { ProductViewPage } from './pages/ProductViewPage';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<ProductsListPage />} />
          <Route path="/products/:id" element={<ProductViewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;