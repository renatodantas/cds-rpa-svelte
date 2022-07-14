import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore/lite';
import type { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import type { Diaria, DiariaSelecaoPagamento } from '../models/diaria';
import { contratoService } from './contratos.service';
import { db } from './firebase.service';
import { pagamentosService } from './pagamentos.service';

class DiariasService {

  private readonly COLLECTION = 'diarias';

  async list(idAutonomo: string): Promise<Diaria[]> {
    const querySnapshot = query(
      collection(db, this.COLLECTION),
      where('idAutonomo', '==', idAutonomo));
    const snapshot = await getDocs(querySnapshot);
    return snapshot.docs.map(doc => doc.data()) as Diaria[];
  }

  async getByID(idDiaria: string): Promise<Diaria | undefined> {
    const docSnap = await getDoc(doc(db, this.COLLECTION, idDiaria));
    return docSnap.data() as Diaria;
  }

  async listDiariasPendentesPagamento(): Promise<DiariaSelecaoPagamento[]> {
    // 1 - Recuperar todas as diárias dos autônomos;
    let todasAsDiarias: DiariaSelecaoPagamento[] = [];
    //for (const autonomo of autonomoService.MOCK) {
    for (const autonomo of []) {
      const newDiarias = (await this.list(autonomo.id)).map(d => ({
        ...d,
        vtSelecionado: false,
        vrSelecionado: false,
        diariaSelecionada: false,
        tudoSelecionado: false,
      }));
      todasAsDiarias = [...todasAsDiarias, ...newDiarias];
    }

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

    const idDiariasQuitadas: string[] = [];
    lasDiarias.forEach((controle, idDiaria) => {
      if (controle.vt && controle.vr && controle.diaria)
        idDiariasQuitadas.push(idDiaria);
    });

    const diariasParcialmenteQuitadas = todasAsDiarias.filter(d => !idDiariasQuitadas.includes(d.id));

    // 3 - Marcar como "disable" os valores que ainda não foram pagos
    const diariasParcialmenteQuitadasEConfiguradas = diariasParcialmenteQuitadas.map(d => ({
      ...d,
      disableVT: todasAsDiariasComPagamento.filter(dp => dp.diaria.id === d.id).some(dp => dp.pagouValorVT),
      disableVR: todasAsDiariasComPagamento.filter(dp => dp.diaria.id === d.id).some(dp => dp.pagouValorVR),
      disableDiaria: todasAsDiariasComPagamento.filter(dp => dp.diaria.id === d.id).some(dp => dp.pagouValorDiaria)
    }));
    return diariasParcialmenteQuitadasEConfiguradas;
  }

  async salvar(item: Diaria, dataInicio: DateTime, dataFim?: DateTime): Promise<void> {
    if (!item.valorDiaria || item.valorDiaria === 0) {
      throw 'Valor da diária deve ser maior que R$ 0,00.';
    }
    const allDiarias = []; //contratoService.MOCK.flatMap(c => c.diarias);
    const contrato = contratoService.getByID(item.idContrato);
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


    if (!item.id) {
      item.id = nanoid();
    }

    const itemRef = doc(db, this.COLLECTION, item.id);
    try {
      await setDoc(itemRef, item);
    } catch (err) {
      console.log(Error(err));
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