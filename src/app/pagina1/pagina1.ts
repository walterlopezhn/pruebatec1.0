import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/ClienteService';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.html',
  styleUrls: ['./pagina1.css']
})
export class Pagina1Component implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = { nombre: '', identidad: '' };

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.getAll().subscribe(data => this.clientes = data);
  }

  guardar(): void {
    const op = this.cliente.clienteId
      ? this.clienteService.update(this.cliente)
      : this.clienteService.create(this.cliente);

    op.subscribe(() => {
      this.obtenerClientes();
      this.cliente = { nombre: '', identidad: '' };
    });
  }

  editar(c: Cliente): void {
    this.cliente = { ...c };
  }

  eliminar(id: string): void {
    this.clienteService.delete(id).subscribe(() => this.obtenerClientes());
  }
}
