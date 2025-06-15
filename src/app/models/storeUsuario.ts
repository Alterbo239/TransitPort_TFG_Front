export interface StoreUsuario {
    name: string;
    usuario: string;
    email: string;
    telefono: string;
    ciudad: string;
    codigoPostal: string;
    password: string;
    password_confirmation: string;
    cargo: string;
    empresa?: string;
}