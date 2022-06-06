export const convertStringToDecimal = (valor?: any): number | null => {
  if (valor) {
    return Number(`${valor}`.replace(',', '.'));
  }
  return null;
}