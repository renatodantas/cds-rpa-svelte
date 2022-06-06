export const formatDate = (data: string) => {
  return new Date(data).toLocaleString().substring(0, 10);
}

export const formatDecimal = (valor?: number) => {
  if (!valor) return undefined;
  return Intl
    .NumberFormat('pt-BR', { minimumFractionDigits: 2 })
    .format(valor);
}