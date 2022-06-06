interface StringToNumberParams {
  obj: object;
  attr: string;
}
export const stringToDecimal = (node: HTMLElement, { obj, attr }: StringToNumberParams) => {
  const changeListener = (event: Event) => {
    const target = event.target as HTMLInputElement;
    obj[attr] = Number(`${target.value}`.replace(',', '.')).toFixed(2);
    console.log('Atualiznaod obj:', obj);
  }

  node.addEventListener("change", changeListener);
  return {
    destroy() {
      node.removeEventListener("change", changeListener);
    }
  }
}