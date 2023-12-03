import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PromocionVO } from '../models/promocion.model';
import { PromocionesService } from '../services/promociones.services';
import { MatDialog } from '@angular/material/dialog';
import { PromocionesInfoComponent } from './promociones-info/promociones-info.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent {

  dataSource:MatTableDataSource<PromocionVO> = new MatTableDataSource();
  displayedColumns = ["no","nombre","descuento","opciones"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _promocionesService:PromocionesService,private _dialog: MatDialog){
    this.getPromociones();
  }
  
  getPromociones(){
    this._promocionesService.getPromociones().subscribe(then=>{
      this.dataSource = new MatTableDataSource(then);
      this.dataSource.paginator = this.paginator;
    })
  }
  
  agregarPromocion(){
    const dialogRef = this._dialog.open(PromocionesInfoComponent, {
      width: '50vw', enterAnimationDuration: "1000ms"
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined && 'data' in result) {
        this.dataSource.data = result.data;
        setTimeout(() => {
          this.dataSource.paginator?.lastPage();
          Swal.fire("La promocion se agrego con exito","","success");          
        }, 500);
      }
    });
  }

  editarPromocion(promocion:PromocionVO){
    const dialogRef = this._dialog.open(PromocionesInfoComponent, {
      width: '50vw', enterAnimationDuration: "1000ms",
      data: promocion
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && "data" in result) {
        this.dataSource.data = result.data;
        Swal.fire("La promocion se actualizo con exito","","success");
      }
    });
  }

 async eliminarPromocion(promocion:PromocionVO){
    let res = await Swal.fire({
      title: '¿Estas Seguro?',
      text: "Esta accion es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminar!'
    });

    console.log(res);


    // you logic goes here, whatever that may be 
    // and it must return either True or False

    if (res.isConfirmed) {
      this._promocionesService.destroyProductos(promocion).subscribe(
        then => {
          this.dataSource.data = then;
          Swal.fire("La promocion se elimino con exito","","success");
        }
      );
    }
  }
}
