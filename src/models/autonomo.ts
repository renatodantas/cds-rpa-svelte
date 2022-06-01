import type { Contrato } from "./contrato";

export interface Autonomo {
  id?: string;
  nome: string;
  cpf: string;
  banco: string;
  agencia: number;
  conta: string;
  operacao?: string;
  contratos: Contrato[];
}

export const AUTONOMO_DEFAULT_VALUE: Autonomo = {
  nome: '',
  cpf: '',
  banco: '',
  agencia: 0,
  conta: '',
  contratos: []
}