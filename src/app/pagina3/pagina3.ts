import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { Producto } from '../models/producto.model';
import { DetalleOrden, Orden } from '../models/orden.model';
import { ClienteService } from '../services/ClienteService';
import { ProductoService } from '../services/ProductoService';
import { OrdenService } from '../services/OrdenService';

@Component({
  selector: 'app-pagina3',
  templateUrl: './pagina3.html',
  styleUrls: ['./pagina3.css']
})
export class Pagina3Component implements OnInit {
  clientes: Cliente[] = [];
  productos: Producto[] = [];

  orden: Orden = {
    clienteId: '',
    subtotal: 0,
    impuesto: 0,
    total: 0,
    detalle: []
  };

  selectedProductoId: string = '';
  cantidad: number = 1;

  constructor(
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private ordenService: OrdenService
  ) {}

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(c => this.clientes = c);
    this.productoService.getAll().subscribe(p => this.productos = p);
  }

  agregarProducto(): void {
    const producto = this.productos.find(p => p.productoId === this.selectedProductoId);
    if (!producto) return;

    if (this.cantidad > producto.existencia) {
      alert(`No hay suficiente existencia para "${producto.nombre}"`);
      return;
    }

    const subtotal = producto.precio * this.cantidad;
    const impuesto = subtotal * 0.15;
    const total = subtotal + impuesto;

    this.orden.detalle.push({
      productoId: producto.productoId!,
      nombre: producto.nombre,
      precioUnitario: producto.precio,
      cantidad: this.cantidad,
      subtotal,
      impuesto,
      total
    });

    this.recalcularTotales();
    this.cantidad = 1;
    this.selectedProductoId = '';
  }

  recalcularTotales(): void {
    this.orden.subtotal = this.orden.detalle.reduce((s, d) => s + d.subtotal, 0);
    this.orden.impuesto = this.orden.detalle.reduce((s, d) => s + d.impuesto, 0);
    this.orden.total = this.orden.detalle.reduce((s, d) => s + d.total, 0);
  }

  guardarOrden(): void {
    if (!this.orden.clienteId || this.orden.detalle.length === 0) {
      alert('Debe seleccionar un cliente y al menos un producto.');
      return;
    }

    this.ordenService.create(this.orden).then(() => {
      alert('Orden guardada con éxito');
      this.orden = {
        clienteId: '',
        subtotal: 0,
        impuesto: 0,
        total: 0,
        detalle: []
      };
    }).catch(() => {
      alert('Error al guardar la orden');
    });
  }
}