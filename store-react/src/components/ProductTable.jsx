const API_BASE = 'http://localhost:5073';

function ProductTable({ products, onEdit, onToggleStatus }) {
  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th className="col-image"></th>
            <th>Produto</th>
            <th className="col-right">Preço</th>
            <th className="col-right">Estoque</th>
            <th>Status</th>
            <th className="col-actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const inStock = p.stockQuantity > 0;
            const imageUrl = p.imageUrl
              ? `${API_BASE}${p.imageUrl}`
              : `https://picsum.photos/seed/${p.sku}/80/80`;

            return (
              <tr key={p.id} className={!p.isActive ? 'row-inactive' : ''}>
                <td className="col-image">
                  <img src={imageUrl} alt={p.name} className="table-thumb" />
                </td>
                <td>
                  <div className="product-cell">
                    <span className="product-name">{p.name}</span>
                    <span className="mono">{p.sku}</span>
                  </div>
                </td>
                <td className="col-right price-cell">R$ {p.unitPrice.toFixed(2)}</td>
                <td className="col-right">{p.stockQuantity} unid.</td>
                <td>
                  <div className="status-cell">
                    <span className={`badge ${inStock ? 'ok' : 'out'}`}>
                      {inStock ? 'Em estoque' : 'Esgotado'}
                    </span>
                    {!p.isActive && <span className="badge inactive-badge">Inativo</span>}
                  </div>
                </td>
                <td className="col-actions">
                  <div className="table-actions">
                    <button className="edit-btn" onClick={() => onEdit(p)}>
                      Editar
                    </button>
                    <button
                      className={p.isActive ? 'deactivate-btn' : 'activate-btn'}
                      onClick={() => onToggleStatus(p.id)}
                    >
                      {p.isActive ? 'Desativar' : 'Ativar'}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;