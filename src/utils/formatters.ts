export const formatDecimal = (valor?: number) => {
  if (isNaN(valor)) return undefined;
  return Intl
    .NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .format(valor);
}