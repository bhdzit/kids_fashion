import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsuarioVO } from '../models/usuario.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  
  constructor(private http: HttpClient) {
  }

  getUsuarios(): Observable<UsuarioVO[]> {
    return this.http.get<UsuarioVO[]>("api/v1/usuarios/getUsuarios?rs=servicios.servicio");
  }

  getUsuario(id:number): Observable<UsuarioVO[]> {
    const url = new URL(environment.serverURL);
    url.searchParams.append("wh","id,=,"+id)
    const searchParams = url.search; 
    return this.http.get<UsuarioVO[]>(`api/v1/usuarios/getUsuarios`+searchParams);
  }

  saveUsuario(cliente:UsuarioVO):Observable<UsuarioVO>{
    return this.http.post<UsuarioVO>("api/v1/usuarios/store",cliente);
  }

  destroyUsuario(producto:UsuarioVO):Observable<UsuarioVO[]>{
    return this.http.delete<UsuarioVO[]>("api/v1/usuarios/delete/"+producto.id);
  }

}
