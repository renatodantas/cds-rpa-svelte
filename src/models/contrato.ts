import { DateTime } from 'luxon';
import type { Autonomo } from "./autonomo";
import type { Cargo } from "./cargo";

export interface Contrato {
  id?: string;
  vigenciaInicio: DateTime;
  vigenciaFim: DateTime;
  valorVT?: number;
  valorVR?: number;
  valorDiaria?: number;
  encerradoManualmente: boolean;
  autonomo: Autonomo;
  cargo: Cargo;
  // opção de imprimir modelo
}

export const CONTRATO_DEFAULT_VALUE: Contrato = {
  vigenciaInicio: DateTime.now(),
  vigenciaFim: DateTime.now(),
  encerradoManualmente: false,
  valorVT: null,
  autonomo: null,
  cargo: null
}