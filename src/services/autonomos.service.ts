import type { Autonomo } from "../models/autonomo";

export class AutonomosService {

  private MOCK: Autonomo[] = [
    { id: '1', nome: 'Hen', cpf: '011', banco: 'Itaú', agencia: 5429, conta: '18560', contratos: [] },
    { id: '2', nome: 'Buck', cpf: '008', banco: 'BB', agencia: 3333, conta: '8888', contratos: [] },
    { id: '3', nome: 'Chimney', cpf: '145', banco: 'Caixa', agencia: 113, conta: '9995', operacao: '013', contratos: [] },
  ]

  async listar(): Promise<Autonomo[]> {
    return this.MOCK;
  }

  async getByID(id: string): Promise<Autonomo | undefined> {
    return this.MOCK.find(item => item.id === id);
  }
}