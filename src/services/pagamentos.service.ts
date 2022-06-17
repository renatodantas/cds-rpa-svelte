import { nanoid } from 'nanoid';
import type { Diaria, DiariaSelecaoPagamento } from '../models/diaria';
import type { Pagamento } from '../models/pagamento';
import { contratoService } from './contratos.service';

class PagamentosService {

  MOCK: Pagamento[] = [];

  async list(): Promise<Pagamento[]> {
    return this.MOCK;
  }

  async listByAutonomo(idAutonomo: string): Promise<Pagamento[]> {
    return this.MOCK
      .filter(p => p.diarias.some(d => d.diaria.contrato.autonomo.id === idAutonomo))
      .sort((a, b) => b.data.toMillis() - a.data.toMillis()); // Sentido inverso
  }

  async getByID(idDiaria: string): Promise<Diaria | undefined> {
    return contratoService.MOCK
      .flatMap(c => c.diarias)
      .find(item => item.id === idDiaria);
  }

  async salvar(pagamento: Pagamento, diariasSelecionadas: DiariaSelecaoPagamento[]): Promise<void> {
    const diarias = diariasSelecionadas
      .filter(diaria => diaria.vtSelecionado || diaria.vrSelecionado || diaria.diariaSelecionada)
      .map(diaria => ({
        pagamento,
        diaria,
        pagouValorVT: diaria.vtSelecionado,
        pagouValorVR: diaria.vrSelecionado,
        pagouValorDiaria: diaria.diariaSelecionada
      }));
    console.log('diarias salvas:', diarias);

    if (diarias.length === 0) {
      throw 'O valor do pagamento deve ser superior a R$ 0,00.';
    }
    pagamento.diarias = diarias;

    if (!pagamento.id) {
      pagamento.id = nanoid();
    }
    this.MOCK = [...this.MOCK, pagamento];
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