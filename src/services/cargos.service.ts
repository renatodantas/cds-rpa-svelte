import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';
import type { Cargo } from '../models/cargo';
import { db } from './firebase.service';

class CargosService {

  private readonly COLLECTION = 'cargos';

  async list(): Promise<Cargo[]> {
    const itemsCollection = collection(db, this.COLLECTION);
    const snapshot = await getDocs(itemsCollection);
    return snapshot.docs.map(doc => doc.data()) as Cargo[];
  }

  async getByID(id: string): Promise<Cargo | undefined> {
    const docSnap = await getDoc(doc(db, this.COLLECTION, id));
    return docSnap.data() as Cargo;
  }

  async salvar(item: Cargo): Promise<void> {
    if (!item.id) {
      item.id = nanoid();
    }

    const cargoRef = doc(db, this.COLLECTION, item.id);
    await setDoc(cargoRef, { ...item });
  }

  async remover(item: Cargo): Promise<boolean> {
    if (confirm(`Confirma a exclusão de "${item.descricao}?"`)) {
      await deleteDoc(doc(db, this.COLLECTION, item.id));
      return true;
    }
    return false;
  }
}

export const cargosService = new CargosService();