import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';
import type { Cargo } from '../models/cargo';
import { db } from './firebase.service';

class CargosService {

  async list(): Promise<Cargo[]> {
    // return this.MOCK.sort((a, b) => a.descricao.localeCompare(b.descricao));
    const cargosCollection = collection(db, 'cargos');
    const cargoSnapshot = await getDocs(cargosCollection);
    const cargoList = cargoSnapshot.docs.map(doc => doc.data()) as Cargo[];
    return cargoList;
  }

  async getByID(id: string): Promise<Cargo | undefined> {
    const docSnap = await getDoc(doc(db, "cargos", id));
    return docSnap.data() as Cargo;
  }

  async salvar(item: Cargo): Promise<void> {
    if (!item.id) {
      item.id = nanoid();
    }

    const cargoRef = doc(db, "cargos", item.id);
    await setDoc(cargoRef, { ...item });
  }

  async remover(item: Cargo): Promise<boolean> {
    if (confirm(`Confirma a exclusão de "${item.descricao}?"`)) {
      await deleteDoc(doc(db, "cargos", item.id));
      return true;
    }
    return false;
  }
}

export const cargosService = new CargosService();