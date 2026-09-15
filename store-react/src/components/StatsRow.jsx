function StatsRow({ products }) {
  const totalProducts = products.length;
  const outOfStockCount = products.filter((p) => p.stockQuantity === 0).length;
  const totalUnits = products.reduce((sum, p) => sum + p.stockQuantity, 0);
  const totalValue = products.reduce((sum, p) => sum + p.unitPrice * p.stockQuantity, 0);

  const stats = [
    { label: 'Total de produtos', value: totalProducts },
    { label: 'Unidades em estoque', value: totalUnits, accent: 'ok' },
    { label: 'Produtos esgotados', value: outOfStockCount, accent: 'danger' },
    {
      label: 'Valor em estoque',
      value: `R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    },
  ];


}

export default StatsRow;