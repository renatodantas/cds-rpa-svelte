import type { Contrato } from "./contrato";
import type { Diaria } from "./diaria";

export interface Pagamento {
  data: Date;
  valor: number; //= valor das diárias do contrato - pagamentos feitos
  contrato: Contrato;
  diarias: Diaria[];
}