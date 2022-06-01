import type { Autonomo } from "./autonomo";
import type { Cargo } from "./cargo";

export interface Contrato {
  vigenciaInicio: Date;
  vigenciaFim: Date;
  valorVT: number;
  valorVR: number;
  valorDiaria: number;
  encerradoManualmente: boolean;
  autonomo: Autonomo;
  cargo: Cargo;
  // opção de imprimir modelo
}