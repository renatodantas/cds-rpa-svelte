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
  const { format } = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const changeListener = (event: Event) => {
    // Converte o valor para "number" e atribui ao objeto
    const numberWithoutDots = node.value.replace(/\D/g, '');
    const numberString = numberWithoutDots.substring(0, numberWithoutDots.length - 2)
      + '.' + numberWithoutDots.substring(numberWithoutDots.length - 2);
    const numberValue = parseFloat(numberString);
    obj[attr] = numberValue;

    // Devolvendo o valor formatado ao input
    node.value = format(numberValue);
    console.log('Num. convertido e despachando:', format(numberValue));
    node.dispatchEvent(new Event('change'));
  }

  const events = ['focus', 'blur', 'keyup']
  events.forEach(evt => node.addEventListener(evt, changeListener));

  return {
    destroy() {
      events.forEach(evt => node.removeEventListener(evt, changeListener));
    }
  }
}