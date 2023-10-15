import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ServicioVO } from '../models/servicio.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class Servicioservice {

  
  constructor(private http: HttpClient) {
  }

  getAllServicios(): Observable<ServicioVO[]> {
    return this.http.get<ServicioVO[]>(`api/v1/servicios/getServicios?rs=productos.producto`, {});
  }

  getServicio(id:number): Observable<ServicioVO[]> {
    const url = new URL(environment.serverURL);
    url.searchParams.append("wh","id,=,"+id)
    const searchParams = url.search; 
    return this.http.get<ServicioVO[]>(`api/v1/servicios/getServicios${searchParams}`);
  }

  getProdcutosOfServicio(id:number): Observable<any[]> {
    const url = new URL(environment.serverURL);
    url.searchParams.append("wh","servicio,=,"+id)
    const searchParams = url.search; 
    return this.http.get<any[]>(`api/v1/servicios-productos/getProductosOfServices${searchParams}&rs=producto`);
  }

  saveServicio(servicio:ServicioVO):Observable<ServicioVO>{
    return this.http.post<ServicioVO>("api/v1/servicios/store",servicio);
  }

  saveProductoOfServicio(producto:any):Observable<ServicioVO>{
    return this.http.post<ServicioVO>("api/v1/servicios-productos/store",producto);
  }

  destroyServicio(servicio:ServicioVO):Observable<ServicioVO[]>{
    return this.http.delete<ServicioVO[]>("api/v1/servicios/delete/"+servicio.id);
  }
  destroyProdcutosOfServicio(producto:any):Observable<any>{
    return this.http.delete<ServicioVO[]>("api/v1/servicios/delete/"+producto.id);
  }

}
