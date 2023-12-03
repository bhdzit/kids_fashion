export interface CitaVO{
    id?:number;
    estilista:number,
    servicio:number,
    cliente?:number,
    fecha:Date|undefined,
    estatus?:number;
}