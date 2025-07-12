import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Orden } from '../models/orden.model';

@Injectable({ providedIn: 'root' })
export class OrdenService {
  private ordenes: Orden[] = [];

  create(orden: Orden): Observable<void> {
    const id = (Math.random() * 100000).toFixed(0);
    this.ordenes.push({ ...orden, ordenId: id });
    return of();
  }

  getAll(): Observable<Orden[]> {
    return of(this.ordenes);
  }
}
