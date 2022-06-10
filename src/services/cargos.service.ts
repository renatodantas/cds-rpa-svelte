import { nanoid } from 'nanoid';
import type { Cargo } from '../models/cargo';

class CargosService {

  MOCK: Cargo[] = [
    { id: nanoid(), descricao: 'Auxiliar de motorista', centroCustoCodigo: '011', centroCustoDescricao: 'Transporte' },
    { id: nanoid(), descricao: 'Auxiliar de logística', centroCustoCodigo: '008', centroCustoDescricao: 'Logística' },
    { id: nanoid(), descricao: 'Motorista', centroCustoCodigo: '145', centroCustoDescricao: 'Transporte' },
  ]

  async list(): Promise<Cargo[]> {
    return this.MOCK.sort((a, b) => a.descricao.localeCompare(b.descricao));
  }

  async getByID(id: string): Promise<Cargo | undefined> {
    return this.MOCK.find(item => item.id === id);
  }

  async salvar(item: Cargo): Promise<void> {
    const index = this.MOCK.findIndex(a => a.id === item.id);
    if (index === -1) {
      this.MOCK.push({ ...item, id: nanoid() });
    } else {
      this.MOCK.splice(index, 1, item);
    }
  }

  async remover(item: Cargo): Promise<boolean> {
    if (confirm(`Confirma a exclusão de "${item.descricao}?"`)) {
      this.MOCK = this.MOCK.filter(aut => aut.id !== item.id);
      return true;
    }
    return false;
  }
}

export const cargosService = new CargosService();