import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Cliente } from './models/cliente.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private path = 'clientes';

  constructor(private firestore: Firestore) {}

  getAll(): Observable<Cliente[]> {
    const ref = collection(this.firestore, this.path);
    return collectionData(ref, { idField: 'clienteId' }) as Observable<Cliente[]>;
  }

  create(cliente: Cliente): Promise<void> {
    const id = doc(collection(this.firestore, this.path)).id;
    const ref = doc(this.firestore, `${this.path}/${id}`);
    return setDoc(ref, cliente);
  }

  update(cliente: Cliente): Promise<void> {
    const ref = doc(this.firestore, `${this.path}/${cliente.clienteId}`);
    return updateDoc(ref, { nombre: cliente.nombre, identidad: cliente.identidad });
  }

  delete(id: string): Promise<void> {
    const ref = doc(this.firestore, `${this.path}/${id}`);
    return deleteDoc(ref);
  }
}
