import { convertToDecimal } from "./converters";
import { formatDecimal } from "./formatters";

interface StringToNumberParams {
  obj: object;
  attr: string;
}

/**
 * Formata o input com máscara de valor, ao mesmo tempo inclui o valor
 * no formato "number" no objeto selecionado.
 * 
 * Deve-se usar como action do Svelte.
 * @see https://svelte.dev/docs#template-syntax-element-directives-use-action
 */
export const stringToDecimal = (node: HTMLInputElement, { obj, attr }: StringToNumberParams) => {
  const changeListener = (event: Event) => {
    const numberValue = convertToDecimal(node.value);
    obj[attr] = numberValue;

    // Devolvendo o valor formatado ao input
    node.value = formatDecimal(numberValue);
    console.log('Num. convertido e despachando:', formatDecimal(numberValue));
  }

  const events = ['keyup']
  events.forEach(evt => node.addEventListener(evt, changeListener));

  return {
    destroy() {
      events.forEach(evt => node.removeEventListener(evt, changeListener));
    }
  }
}