import type { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import type { Diaria, DiariaSelecaoPagamento } from '../models/diaria';
import { autonomoService } from './autonomos.service';
import { contratoService } from './contratos.service';
import { pagamentosService } from './pagamentos.service';

class DiariasService {

  async list(idAutonomo: string): Promise<Diaria[]> {
    return contratoService.MOCK.filter(c => c.autonomo.id === idAutonomo)[0].diarias;
  }

  async getByID(idDiaria: string): Promise<Diaria | undefined> {
    return contratoService.MOCK
      .flatMap(c => c.diarias)
      .find(item => item.id === idDiaria);
  }

  async listDiariasPendentesPagamento(): Promise<DiariaSelecaoPagamento[]> {
    // 1 - Recuperar todas as diárias dos autônomos;
    let todasAsDiarias: DiariaSelecaoPagamento[] = [];
    for (const autonomo of autonomoService.MOCK) {
      const newDiarias = (await this.list(autonomo.id)).map(d => ({
        ...d,
        vtSelecionado: false,
        vrSelecionado: false,
        diariaSelecionada: false,
        tudoSelecionado: false,
      }));
      todasAsDiarias = [...todasAsDiarias, ...newDiarias];
    }
    console.log('todasAsDiarias: ', todasAsDiarias);

    // 2 - Remover as diárias totalmente pagas
    const todasAsDiariasComPagamento = pagamentosService.MOCK.flatMap(p => p.diarias);
    // FIXME: nesse ponto há situação de 2 ou mais pagamentos para quitar uma diária
    type ControlePagto = { vt: boolean, vr: boolean, diaria: boolean };
    const lasDiarias: Map<string, ControlePagto> = new Map();
    for (const pagtoDiaria of todasAsDiariasComPagamento) {
      let infoPagamento = { vt: pagtoDiaria.pagouValorVT, vr: pagtoDiaria.pagouValorVR, diaria: pagtoDiaria.pagouValorDiaria };
      if (!lasDiarias.has(pagtoDiaria.diaria.id)) {
        lasDiarias.set(pagtoDiaria.diaria.id, infoPagamento);
      } else {
        infoPagamento = lasDiarias.get(pagtoDiaria.diaria.id);
        if (pagtoDiaria.pagouValorVT) infoPagamento.vt = true;
        if (pagtoDiaria.pagouValorVR) infoPagamento.vr = true;
        if (pagtoDiaria.pagouValorDiaria) infoPagamento.diaria = true;
      }
    }
    console.log('lasDiarias: ', lasDiarias);

    const idDiariasQuitadas: string[] = [];
    lasDiarias.forEach((controle, idDiaria) => {
      if (controle.vt && controle.vr && controle.diaria)
        idDiariasQuitadas.push(idDiaria);
    });

    const diariasParcialmenteQuitadas = todasAsDiarias.filter(d => !idDiariasQuitadas.includes(d.id));
    console.log('diariasParcialmenteQuitadas: ', diariasParcialmenteQuitadas);

    // 3 - Marcar como "disable" os valores que ainda não foram pagos
    const diariasParcialmenteQuitadasEConfiguradas = diariasParcialmenteQuitadas.map(d => ({
      ...d,
      disableVT: todasAsDiariasComPagamento.filter(dp => dp.diaria.id === d.id).some(dp => dp.pagouValorVT),
      disableVR: todasAsDiariasComPagamento.filter(dp => dp.diaria.id === d.id).some(dp => dp.pagouValorVR),
      disableDiaria: todasAsDiariasComPagamento.filter(dp => dp.diaria.id === d.id).some(dp => dp.pagouValorDiaria)
    }));

    console.log('diariasParcialmenteQuitadasEConfiguradas: ', diariasParcialmenteQuitadasEConfiguradas);
    return diariasParcialmenteQuitadasEConfiguradas;
  }

  async salvar(item: Diaria, dataInicio: DateTime, dataFim?: DateTime): Promise<void> {
    if (!item.valorDiaria || item.valorDiaria === 0) {
      throw 'Valor da diária deve ser maior que R$ 0,00.';
    }
    const allDiarias = contratoService.MOCK.flatMap(c => c.diarias);
    const contrato = contratoService.MOCK.find(c => c.id === item.contrato.id);
    const indexDiariaExistente = allDiarias.findIndex(a => a.id === item.id);

    const novasDiarias: Diaria[] = [];
    if (dataFim) {
      // Cria as diárias para o periodo fornecido
      let data = dataInicio;
      while (dataFim.diff(data, 'days').days >= 0) {
        novasDiarias.push({ ...item, id: nanoid(), data });
        data = data.plus({ day: 1 });
      }
    } else {
      item.data = dataInicio;
    }

    if (indexDiariaExistente === -1) {
      contrato.diarias = [...contrato.diarias, ...novasDiarias];
    } else {
      contrato.diarias.splice(indexDiariaExistente, 1, item);
    }
  }

  async remover(item: Diaria): Promise<boolean> {
    if (confirm(`Confirma a exclusão da diária de ${item.data.toLocaleString()}?`)) {
      const contrato = contratoService.MOCK.find(c => c.id === item.contrato.id);
      contrato.diarias = contrato.diarias.filter(d => d.id !== item.id);
      return true;
    }
    return false;
  }
}

export const diariasService = new DiariasService();