export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  }).format(value);
}

export function formatDecimal(value: number) {
  return value.toFixed(1).replace('.', ',');
}
