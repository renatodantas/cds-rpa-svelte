import type { DateTime } from "luxon";
import type { Diaria } from "./diaria";

export interface Pagamento {
  id?: string;
  data: DateTime;
  valor: number;
  diarias: PagamentoDiaria[];
}

export interface PagamentoDiaria {
  pagamento: Pagamento;
  diaria: Diaria;
  pagouValorVT: boolean;
  pagouValorVR: boolean;
  pagouValorDiaria: boolean;
}