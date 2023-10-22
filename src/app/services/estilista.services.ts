import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsuarioVO } from '../models/usuario.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EstilistaService {

  
  constructor(private http: HttpClient) {
  }

  getServiciosOfEstilista(id:any): Observable<any[]> {
    const url = new URL(environment.serverURL);
    url.searchParams.append("wh","usuario,=,"+id)
    const searchParams = url.search; 
    return this.http.get<any[]>(`api/v1/servicios-estilista/getServiciosOfEstilista${searchParams}&rs=servicio`);
  }

  saveServicioOfEstilista(servicio:any):Observable<any>{
    return this.http.post<any>("api/v1/servicios-estilista/store",servicio);
  }

  destroyServicioOfEstilista(servicio:any):Observable<any>{
    return this.http.delete<any[]>("api/v1/servicios-estilista/delete/"+servicio.id);
  }

  getHorarioEstilista(id:any): Observable<any[]> {
    const url = new URL(environment.serverURL);
    url.searchParams.append("wh","usuario,=,"+id)
    const searchParams = url.search; 
    return this.http.get<any[]>(`api/v1/horario-estilista/getHorario${searchParams}`);
  }

  saveHorarioEstilista(horario:any):Observable<any>{
    return this.http.post<any>("api/v1/horario-estilista/store",horario);
  }


}
