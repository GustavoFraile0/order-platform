function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function DashboardHeader({ onNewProduct }) {
  return (
    <div className="dashboard-banner">
      <div className="banner-content">
        <span className="banner-tag">{getGreeting().toUpperCase()}</span>
        <h1>Painel de Estoque</h1>
        <p>Gerencie seus produtos: acompanhe estoque, preços e disponibilidade em um só lugar.</p>
      </div>
      <div className="banner-actions">
        <button className="banner-btn primary" onClick={onNewProduct}>
          + Novo produto
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;