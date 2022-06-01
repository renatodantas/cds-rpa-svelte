import type { Contrato } from "./contrato";

export interface Diaria {
  data: Date;
  valorVT: number; // (busca do contrato)
  valorVR: number; // (busca do contrato)
  valorDiaria: number; // (busca do contrato)
  observacao?: string; // (justificar alteração de valor)
  contrato: Contrato;
}