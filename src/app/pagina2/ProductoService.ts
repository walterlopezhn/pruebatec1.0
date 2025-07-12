import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private productos: Producto[] = [];

  getAll(): Observable<Producto[]> {
    return of(this.productos);
  }

  create(producto: Producto): Observable<void> {
    const id = (Math.random() * 100000).toFixed(0);
    this.productos.push({ ...producto, productoId: id });
    return of();
  }

  update(producto: Producto): Observable<void> {
    const index = this.productos.findIndex(p => p.productoId === producto.productoId);
    if (index !== -1) this.productos[index] = producto;
    return of();
  }

  delete(id: string): Observable<void> {
    this.productos = this.productos.filter(p => p.productoId !== id);
    return of();
  }
}
