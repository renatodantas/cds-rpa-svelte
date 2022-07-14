import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';
import type { Contrato } from '../models/contrato';
import { db } from './firebase.service';

class ContratosService {

  private readonly COLLECTION = 'contratos';

  async list(idAutonomo: string): Promise<Contrato[]> {
    const querySnapshot = query(
      collection(db, this.COLLECTION),
      where('idAutonomo', '==', idAutonomo),
      where('encerradoManualmente', '==', false));
    const snapshot = await getDocs(querySnapshot);
    return snapshot.docs.map(doc => doc.data()) as Contrato[];
  }

  async getByID(idContrato: string): Promise<Contrato | undefined> {
    const docSnap = await getDoc(doc(db, this.COLLECTION, idContrato));
    return docSnap.data() as Contrato;
  }

  async salvar(item: Contrato): Promise<void> {
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

  async encerrar(item: Contrato): Promise<void> {
    if (confirm(`Confirma o encerramento manual do contrato?`)) {
      this.salvar({ ...item, encerradoManualmente: true });
    }
  }
}

export const contratoService = new ContratosService();