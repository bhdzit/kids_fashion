import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PromocionVO } from '../models/promocion.model';
import { PromocionesService } from '../services/promociones.services';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent {

  dataSource:MatTableDataSource<PromocionVO> = new MatTableDataSource();
  displayedColumns = ["no","nombre","descuento","opciones"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _promocionesService:PromocionesService){
    this.getPromociones();
  }
  
  getPromociones(){
    this._promocionesService.getPromociones().subscribe(then=>{
      this.dataSource = new MatTableDataSource(then);
      this.dataSource.paginator = this.paginator;
    })
  }
  
  agregarPromocion(){

  }

  editarPromocion(promocion:PromocionVO){

  }

  eliminarPromocion(promocion:PromocionVO){

  }
}
