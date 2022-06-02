export interface Cargo {
  id?: string;
  descricao: string;
  centroCustoCodigo: string;
  centroCustoDescricao: string;
}

export const CARGO_DEFAULT_VALUE: Cargo = {
  descricao: '',
  centroCustoCodigo: '',
  centroCustoDescricao: ''
}