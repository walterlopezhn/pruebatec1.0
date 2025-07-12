export interface DetalleOrden {
  productoId: string;
  nombre?: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
  impuesto: number;
  total: number;
}

export interface Orden {
  ordenId?: string;
  clienteId: string;
  subtotal: number;
  impuesto: number;
  total: number;
  detalle: DetalleOrden[];
}
