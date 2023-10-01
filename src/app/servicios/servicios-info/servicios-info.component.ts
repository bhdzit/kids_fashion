import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServicioVO } from 'src/app/models/servicio.model';

@Component({
  selector: 'app-servicios-info-dialog',
  templateUrl: './servicios-info.component.html',
  styleUrls: ['./servicios-info.component.css'],
})
export class ServiciosInfoComponent {
  submitErrorMsg: any = {};
  servicioVO: ServicioVO= {
    nombre: '',
    productos: [],
    tiempo: 0,
    costo: 0
  };
  dataSource:MatTableDataSource<any[]> = new MatTableDataSource();
  displayedColumns = ["no","producto","cantidad","opciones"];
  constructor() {}

  cerrar(){

  }
}
