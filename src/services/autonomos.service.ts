import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';
import type { Autonomo } from "../models/autonomo";
import { db } from './firebase.service';

class AutonomosService {

  private readonly COLLECTION = 'autonomos';

  async list(): Promise<Autonomo[]> {
    const itemsCollection = collection(db, this.COLLECTION);
    const snapshot = await getDocs(itemsCollection);
    return snapshot.docs.map(doc => doc.data()) as Autonomo[];
  }

  async getByID(id: string): Promise<Autonomo | undefined> {
    const docSnap = await getDoc(doc(db, this.COLLECTION, id));
    return docSnap.data() as Autonomo;
  }

  async salvar(item: Autonomo): Promise<void> {
    if (!item.id) {
      item.id = nanoid();
    }

    const itemRef = doc(db, this.COLLECTION, item.id);
    await setDoc(itemRef, { ...item });
  }

  async remover(item: Autonomo): Promise<boolean> {
    if (confirm(`Confirma a exclusão de "${item.nome}?"`)) {
      await deleteDoc(doc(db, this.COLLECTION, item.id));
      return true;
    }
    return false;
  }
}

export const autonomoService = new AutonomosService();