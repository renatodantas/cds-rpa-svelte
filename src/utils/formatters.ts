export const formatDecimal = (valor?: number) => {
  if (!valor || valor === 0) return null;
  return Intl
    .NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .format(valor);
}