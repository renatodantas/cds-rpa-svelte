import type { Autonomo } from "./autonomo";
import type { Cargo } from "./cargo";

export interface Contrato {
  id?: string;
  vigenciaInicio: string;
  vigenciaFim: string;
  valorVT?: number;
  valorVR?: number;
  valorDiaria?: number;
  encerradoManualmente?: boolean;
  autonomo: Autonomo;
  cargo: Cargo;
  // opção de imprimir modelo
}

export const CONTRATO_DEFAULT_VALUE: Contrato = {
  vigenciaInicio: new Date().toISOString().substring(0, 10),
  vigenciaFim: new Date().toISOString().substring(0, 10),
  encerradoManualmente: false,
  autonomo: null,
  cargo: null
}