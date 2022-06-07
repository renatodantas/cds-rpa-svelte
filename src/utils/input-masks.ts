import { convertToDecimal } from "./converters";
import { formatDecimal } from "./formatters";

/**
 * Formata o input para renderizar 2 casas decimais.
 * 
 * @param e evento do input
 */
export const handleCurencyInput = (e: Event, item: any) => {
  const target = e.target as HTMLInputElement;
  const decimal = convertToDecimal(target.value);
  // Atualiza a propriedade do item informado com o valor numérico
  item[target.id] = decimal || null;

  const decimalFormatado = formatDecimal(decimal);
  target.value = decimalFormatado || '';
  console.log(target.value);
};