import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PromocionVO } from '../models/promocion.model';


@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  
  constructor(private http: HttpClient) {
  }

  getPromociones(): Observable<PromocionVO[]> {
    return this.http.get<PromocionVO[]>("api/v1/promociones/get", {});
  }

  saveProducto(cliente:PromocionVO):Observable<PromocionVO[]>{
    return this.http.post<PromocionVO[]>("api/v1/promociones/store",cliente);
  }

  destroyProductos(producto:PromocionVO):Observable<PromocionVO[]>{
    return this.http.delete<PromocionVO[]>("api/v1/promociones/delete/"+producto.id);
  }

}
