import type { Diaria } from '../models/diaria';
import type { Pagamento } from '../models/pagamento';
import { contratoService } from './contratos.service';

class PagamentosService {

  MOCK: Pagamento[] = [];

  async list(): Promise<Pagamento[]> {
    return this.MOCK;
  }

  async listByAutonomo(idAutonomo: string): Promise<Pagamento[]> {
    return this.MOCK.filter(p => p.diarias.some(d => d.diaria.contrato.autonomo.id === idAutonomo));
  }

  async getByID(idDiaria: string): Promise<Diaria | undefined> {
    return contratoService.MOCK
      .flatMap(c => c.diarias)
      .find(item => item.id === idDiaria);
  }

  async salvar(): Promise<void> {
    // const allDiarias = contratoService.MOCK.flatMap(c => c.diarias);
    // const contrato = contratoService.MOCK.find(c => c.id === item.contrato.id);
    // const indexDiariaExistente = allDiarias.findIndex(a => a.id === item.id);

    // const novasDiarias: Diaria[] = [];
    // if (dataFim) {
    //   // Cria as diárias para o periodo fornecido
    //   let data = dataInicio;
    //   while (dataFim.diff(data, 'days').days >= 0) {
    //     novasDiarias.push({ ...item, id: nanoid(), data });
    //     data = data.plus({ day: 1 });
    //   }
    // } else {
    //   item.data = dataInicio;
    // }

    // if (indexDiariaExistente === -1) {
    //   contrato.diarias = [...contrato.diarias, ...novasDiarias];
    // } else {
    //   contrato.diarias.splice(indexDiariaExistente, 1, item);
    // }
  }

  async remover(item: Pagamento): Promise<boolean> {
    if (confirm(`Confirma a exclusão do pagamento?`)) {
      this.MOCK = this.MOCK.filter(p => p.id !== item.id);
      return true;
    }
    return false;
  }
}

export const pagamentosService = new PagamentosService();