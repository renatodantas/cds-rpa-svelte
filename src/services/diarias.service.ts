import { nanoid } from 'nanoid';
import { type Diaria } from '../models/diaria';

class DiariasService {

  MOCK: Diaria[] = [];

  async list(idAutonomo: string): Promise<Diaria[]> {
    return this.MOCK;
  }

  async getByID(idDiaria: string): Promise<Diaria | undefined> {
    return this.MOCK.find(item => item.id === idDiaria);
  }

  async salvar(item: Diaria): Promise<void> {
    const index = this.MOCK.findIndex(a => a.id === item.id);
    if (index === -1) {
      this.MOCK.push({ ...item, id: nanoid() });
    } else {
      this.MOCK.splice(index, 1, item);
    }
  }

  async remover(item: Diaria): Promise<boolean> {
    if (confirm(`Confirma a exclusão da diária de ${item.data.toLocaleString()}?`)) {
      this.MOCK = this.MOCK.filter(c => c.id !== item.id);
      return true;
    }
    return false;
  }
}

export const diariasService = new DiariasService();