import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ProductoService } from '../services/ProductoService';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.html',
  styleUrls: ['./pagina2.css']
})
export class Pagina2Component implements OnInit {
  productos: Producto[] = [];
  producto: Producto = { nombre: '', descripcion: '', precio: 0, existencia: 0 };

  constructor(private productoService: ProductoService) {}
  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getAll().subscribe(data => this.productos = data);
  }

  guardar(): void {
    const operacion = this.producto.productoId
      ? this.productoService.update(this.producto)
      : this.productoService.create(this.producto);

    operacion.subscribe(() => {
      this.obtenerProductos();
      this.producto = { nombre: '', descripcion: '', precio: 0, existencia: 0 };
    });
  }

  editar(p: Producto): void {
    this.producto = { ...p };
  }

  eliminar(id: string): void {
    this.productoService.delete(id).subscribe(() => this.obtenerProductos());
  }
}
