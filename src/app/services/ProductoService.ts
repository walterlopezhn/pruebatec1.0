import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Producto } from './models/producto.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private path = 'productos';

  constructor(private firestore: Firestore) {}

  getAll(): Observable<Producto[]> {
    const ref = collection(this.firestore, this.path);
    return collectionData(ref, { idField: 'productoId' }) as Observable<Producto[]>;
  }

  create(producto: Producto): Promise<void> {
    const id = doc(collection(this.firestore, this.path)).id;
    const ref = doc(this.firestore, `${this.path}/${id}`);
    return setDoc(ref, producto);
  }

  update(producto: Producto): Promise<void> {
    const ref = doc(this.firestore, `${this.path}/${producto.productoId}`);
    return updateDoc(ref, {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      existencia: producto.existencia
    });
  }

  delete(id: string): Promise<void> {
    const ref = doc(this.firestore, `${this.path}/${id}`);
    return deleteDoc(ref);
  }
}
