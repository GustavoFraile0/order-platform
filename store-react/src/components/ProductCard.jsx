const API_BASE = 'http://localhost:5073';

function ProductCard({ product, onEdit, onToggleStatus }) {
  const inStock = product.stockQuantity > 0;
  const imageUrl = product.imageUrl
    ? `${API_BASE}${product.imageUrl}`
    : `https://picsum.photos/seed/${product.sku}/400/300`;

  return (
    <div className={`card ${!product.isActive ? 'inactive' : ''}`}>
      <div className="card-image">
        <img src={imageUrl} alt={product.name} loading="lazy" />
        <span className={`badge ${inStock ? 'ok' : 'out'}`}>
          {inStock ? 'Em estoque' : 'Esgotado'}
        </span>
      </div>
      <div className="card-body">
        <span className="sku">{product.sku}</span>
        <h2>{product.name}</h2>
        <div className="card-bottom">
          <span className="price">R$ {product.unitPrice.toFixed(2)}</span>
          <span className="stock">{product.stockQuantity} unid.</span>
        </div>

        <div className="card-actions">
          <button className="edit-btn" onClick={() => onEdit(product)}>
            Editar
          </button>
          <button
            className={product.isActive ? 'deactivate-btn' : 'activate-btn'}
            onClick={() => onToggleStatus(product.id)}
          >
            {product.isActive ? 'Desativar' : 'Ativar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;