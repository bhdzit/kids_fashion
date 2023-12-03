import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CitasService } from '../services/citas.services';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PagoServicioInfoComponent } from './pago-servicio-info/pago-servicio-info.component';

@Component({
  selector: 'app-pago-servicio',
  templateUrl: './pago-servicio.component.html',
  styleUrls: ['./pago-servicio.component.css'],
})
export class PagoServicioComponent {
  
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ["no","servicios","estilista","estatus", "promocion","costo","opciones"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _dialog: MatDialog,
    private _citasServices:CitasService){
      this.getData();
    }

  getData(){
    this._citasServices.getCitas().subscribe(then=>{      
      this.dataSource = new MatTableDataSource(then);
      this.dataSource.paginator = this.paginator;      
    });
  }

  pagoServicio(){
    setTimeout(() => {
      this.dataSource.paginator?.lastPage();
    }, 500);
    const dialogRef = this._dialog.open(PagoServicioInfoComponent, {
      width: '50vw',
      enterAnimationDuration: '1000ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined && 'data' in result) {
        this.getData()
        setTimeout(() => {
          this.dataSource.paginator?.lastPage();
        }, 500);
      }
    });
  }
}
