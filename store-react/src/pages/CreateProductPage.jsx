import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

function CreateProductPage({ onSaved }) {
  const navigate = useNavigate();

  const handleSaved = () => {
    onSaved();
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h1>Cadastrar produto</h1>
        <p>Adicione um novo item ao catálogo.</p>
      </header>
      <ProductForm editingProduct={null} onSaved={handleSaved} onCancel={() => navigate('/')} />
    </div>
  );
}

export default CreateProductPage;