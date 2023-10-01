import { ProductoVO } from "./producto.model";

export interface ServicioVO{
    id?:number;
    nombre:string;
    productos:ProductoVO[];
    tiempo:number;
    costo:number;

}