export const formatDate = (data: string) => {
  return new Date(data).toLocaleString().substring(0, 10);
}

export const formatDecimal = (valor?: number) => {
  return valor ? Intl.NumberFormat('pt-BR').format(valor) : '-';
}