export interface Empresa {
  id: number;
  nombre: string;
  ciudad: string;
  codigo_postal: string;
  cif: string;
  email: string;
  id_gestor: number | null;
}
