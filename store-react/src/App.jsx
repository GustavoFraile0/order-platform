import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CatalogPage from './pages/CatalogPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import './App.css';

const API_URL = 'http://localhost:5073/api/Products';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar produtos');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />
        <div className="main-area">
          <Routes>
            <Route
              path="/"
              element={
                <CatalogPage
                  products={products}
                  loading={loading}
                  error={error}
                  onReload={loadProducts}
                />
              }
            />
            <Route path="/cadastrar" element={<CreateProductPage onSaved={loadProducts} />} />
            <Route path="/editar/:id" element={<EditProductPage onSaved={loadProducts} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;