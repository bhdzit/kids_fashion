import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClienteVo } from '../models/cliente.model';
import { ProductoVO } from '../models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  
  constructor(private http: HttpClient) {
  }

  getProductos(): Observable<ProductoVO[]> {
    return this.http.get<ProductoVO[]>("api/v1/productos/getProductos", {});
  }

  saveProducto(cliente:ProductoVO):Observable<ProductoVO[]>{
    return this.http.post<ProductoVO[]>("api/v1/productos/store",cliente);
  }

  destroyProductos(producto:ProductoVO):Observable<ProductoVO[]>{
    return this.http.delete<ProductoVO[]>("api/v1/productos/delete/"+producto.id);
  }

}
