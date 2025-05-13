export interface Cita {
  id: number;
  tipo: string;
  fecha_pedida: string;
  fecha_asignada: string;
  hora: string;
  estado: string;
  id_administrativo: number;
  id_cliente: number;
  id_buque: number;
  id_zona: number;
}
