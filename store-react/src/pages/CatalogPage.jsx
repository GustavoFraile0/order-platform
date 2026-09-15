import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import StatsRow from '../components/StatsRow';
import ProductTable from '../components/ProductTable';
import StatusMessage from '../components/StatusMessage';

const API_URL = 'http://localhost:5073/api/Products';

function CatalogPage({ products, loading, error, onReload }) {
  const navigate = useNavigate();

  const handleToggleStatus = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/toggle-status`, { method: 'PATCH' });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ao atualizar status (${res.status}): ${text}`);
      }
      onReload();
    } catch (err) {
      console.error('Falha no toggle-status:', err);
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-page">
      <DashboardHeader onNewProduct={() => navigate('/cadastrar')} />

      {loading && <StatusMessage type="loading" message="Carregando produtos..." />}
      {error && <StatusMessage type="error" message={error} />}

      {!loading && !error && (
        <>
          <StatsRow products={products} />

          {products.length === 0 ? (
            <StatusMessage type="loading" message="Nenhum produto cadastrado ainda." />
          ) : (
            <ProductTable
              products={products}
              onEdit={(product) => navigate(`/editar/${product.id}`)}
              onToggleStatus={handleToggleStatus}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CatalogPage;