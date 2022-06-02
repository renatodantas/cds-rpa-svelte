import { nanoid } from 'nanoid';
import type { Autonomo } from "../models/autonomo";

class AutonomosService {

  private MOCK: Autonomo[] = [
    { id: nanoid(), nome: 'Hen', cpf: '011', banco: 'Itaú', agencia: 5429, conta: '18560', contratos: [] },
    { id: nanoid(), nome: 'Buck', cpf: '008', banco: 'BB', agencia: 3333, conta: '8888', contratos: [] },
    { id: nanoid(), nome: 'Chimney', cpf: '145', banco: 'Caixa', agencia: 113, conta: '9995', operacao: '013', contratos: [] },
  ]

  async list(): Promise<Autonomo[]> {
    console.log('Retornando...', this.MOCK.length);
    return this.MOCK;
  }

  async getByID(id: string): Promise<Autonomo | undefined> {
    return this.MOCK.find(item => item.id === id);
  }

  async salvar(item: Autonomo): Promise<void> {
    const index = this.MOCK.findIndex(a => a.id === item.id);
    if (index === -1) {
      this.MOCK = [...this.MOCK, { ...item, id: nanoid() }];
      console.log('adicionando mais:', this.MOCK.length);
    } else {
      this.MOCK = this.MOCK.splice(index, 1, item);
      console.log('substituindo:', this.MOCK.length);
    }
  }
}

export const autonomoService = new AutonomosService();