import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ServicioVO } from '../models/servicio.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PagoServicioService {

  
  constructor(private http: HttpClient) {
  }

  savePagoServicio(servicio:any):Observable<ServicioVO>{
    return this.http.post<ServicioVO>("api/v1/tickets/store",servicio);
  }

}