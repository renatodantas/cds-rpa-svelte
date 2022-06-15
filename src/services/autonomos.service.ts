import { nanoid } from 'nanoid';
import type { Autonomo } from "../models/autonomo";

class AutonomosService {

  MOCK: Autonomo[] = [
    { id: '1', nome: 'Bobby Nash', cpf: '011', banco: 'Itaú', agencia: 5429, conta: '18560', contratos: [] },
    { id: '2', nome: 'Buck', cpf: '008', banco: 'BB', agencia: 3333, conta: '8888', contratos: [] },
    { id: '3', nome: 'Chimney', cpf: '145', banco: 'Caixa', agencia: 113, conta: '9995', operacao: '013', contratos: [] },
  ]

  async list(): Promise<Autonomo[]> {
    return this.MOCK;
  }

  async getByID(id: string): Promise<Autonomo | undefined> {
    return this.MOCK.find(item => item.id === id);
  }

  async salvar(item: Autonomo): Promise<void> {
    const index = this.MOCK.findIndex(a => a.id === item.id);
    if (index === -1) {
      this.MOCK.push({ ...item, id: nanoid() });
    } else {
      this.MOCK.splice(index, 1, item);
    }
  }

  async remover(item: Autonomo): Promise<boolean> {
    if (confirm(`Confirma a exclusão de "${item.nome}?"`)) {
      this.MOCK = this.MOCK.filter(aut => aut.id !== item.id);
      return true;
    }
    return false;
  }
}

export const autonomoService = new AutonomosService();