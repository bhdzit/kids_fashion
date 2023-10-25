import { ServicioVO } from "./servicio.model";

export interface UsuarioVO {
    id ?: number;
    nombre:string;
    usuario:string;
    password:string;
    rol?:string;
    servicios?:ServicioVO[];
}