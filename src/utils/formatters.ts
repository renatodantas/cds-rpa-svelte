import { DateTime } from "luxon";

export const formatDecimal = (valor?: number) => {
  if (!valor || valor === 0) return null;
  return Intl
    .NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .format(valor);
}

export const formatDate = (valor?: string) => {
  if (!valor) return null;
  return DateTime.fromISO(valor).toLocaleString();
}