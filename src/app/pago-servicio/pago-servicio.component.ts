import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pago-servicio',
  templateUrl: './pago-servicio.component.html',
  styleUrls: ['./pago-servicio.component.css'],
})
export class PagoServicioComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ["no","servicios","estilista","promocion","costo","opciones"];
}
