import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClienteVo } from '../models/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  
  constructor(private http: HttpClient) {
  }

  getClientes(): Observable<ClienteVo[]> {
    return this.http.get<ClienteVo[]>("api/v1/clientes/getClientes", {});
  }

  saveCliente(cliente:ClienteVo):Observable<ClienteVo>{
    return this.http.post<ClienteVo>("api/v1/clientes/store",cliente);
  }

  destroyClientes(cliente:ClienteVo):Observable<ClienteVo[]>{
    return this.http.delete<ClienteVo[]>("api/v1/clientes/delete/"+cliente.id);
  }

}
