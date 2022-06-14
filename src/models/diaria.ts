import { DateTime } from "luxon";
import type { Contrato } from "./contrato";

export interface Diaria {
  id?: string;
  data: DateTime;
  valorVT?: number; // (busca do contrato)
  valorVR?: number; // (busca do contrato)
  valorDiaria: number; // (busca do contrato)
  observacao?: string; // (justificar alteração de valor)
  contrato?: Contrato;
}

/**
 * Usada na tela de seleção dos valores das diárias para pagamento.
 */
export interface DiariaSelecaoPagamento extends Diaria {
  todosSelecionados: boolean;
  vtSelecionado: boolean;
  vrSelecionado: boolean;
  diariaSelecionada: boolean;
}

export const DIARIA_DEFAULT_VALUE: Diaria = {
  data: DateTime.now(),
  valorDiaria: 0,
}