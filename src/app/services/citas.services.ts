import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClienteVo } from '../models/cliente.model';
import { ProductoVO } from '../models/producto.model';
import { CitaVO } from '../models/cita.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  
  constructor(private http: HttpClient) {
  }

  getCitas(): Observable<CitaVO[]> {
    return this.http.get<CitaVO[]>("api/v1/citas/getCitas?rs=estilista,servicio,estatus,ticket", {});
  }

  getCitaById(id:number): Observable<CitaVO[]> {
    const url = new URL(environment.serverURL);
    url.searchParams.append("wh","id,=,"+id)
    const searchParams = url.search;     
    return this.http.get<CitaVO[]>("api/v1/citas/getCitas"+searchParams+"&rs=estilista,servicio,estatus,ticket,cliente");
  }

  saveCita(cita:CitaVO):Observable<ProductoVO[]>{
    if(cita.id==null||cita.id==undefined) cita.estatus=1;
    return this.http.post<ProductoVO[]>("api/v1/citas/store",cita);
  }

  destroyCita(cita:CitaVO):Observable<ProductoVO[]>{
    return this.http.delete<ProductoVO[]>("api/v1/citas/delete/"+cita.id);
  }

}
