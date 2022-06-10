import { nanoid } from 'nanoid';
import { CONTRATO_DEFAULT_VALUE, type Contrato } from '../models/contrato';
import { autonomoService } from './autonomos.service';
import { cargosService } from './cargos.service';

class ContratosService {

  MOCK: Contrato[] = autonomoService.MOCK.map((autonomo, index) =>
    ({ ...CONTRATO_DEFAULT_VALUE, id: nanoid(), autonomo, cargo: cargosService.MOCK[index] })
  )

  async list(idAutonomo: string): Promise<Contrato[]> {
    return this.MOCK
      .filter(c => c.autonomo.id === idAutonomo)
      .filter(c => !c.encerradoManualmente);
  }

  async getByID(idContrato: string): Promise<Contrato | undefined> {
    return this.MOCK.find(item => item.id === idContrato);
  }

  async salvar(item: Contrato): Promise<void> {
    const index = this.MOCK.findIndex(a => a.id === item.id);
    if (index === -1) {
      this.MOCK.push({ ...item, id: nanoid() });
    } else {
      this.MOCK.splice(index, 1, item);
    }
  }

  async encerrar(item: Contrato): Promise<void> {
    if (confirm(`Confirma o encerramento manual do contrato?`)) {
      this.MOCK.find(c => c.id === item.id).encerradoManualmente = true;
    }
  }
}

export const contratoService = new ContratosService();