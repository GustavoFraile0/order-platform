import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import StatusMessage from '../components/StatusMessage';

const API_URL = 'http://localhost:5073/api/Products';

function EditProductPage({ onSaved }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Produto não encontrado');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSaved = () => {
    onSaved();
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h1>Editar produto</h1>
        <p>Atualize as informações do item.</p>
      </header>

      {loading && <StatusMessage type="loading" message="Carregando produto..." />}
      {error && <StatusMessage type="error" message={error} />}
      {product && (
        <ProductForm editingProduct={product} onSaved={handleSaved} onCancel={() => navigate('/')} />
      )}
    </div>
  );
}

export default EditProductPage;