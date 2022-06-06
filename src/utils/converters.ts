export const convertToNumber = (value?: any): number | null => {
  if (!value) {
    return;
  }

  const { format } = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Converte o valor para "number" e atribui ao objeto
  const numberWithoutDots = value.replace(/\D/g, '');
  const numberString = numberWithoutDots.substring(0, numberWithoutDots.length - 2)
    + '.' + numberWithoutDots.substring(numberWithoutDots.length - 2);
  return parseFloat(numberString);
}