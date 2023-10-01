import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  dataSource:MatTableDataSource<any[]> = new MatTableDataSource();
  displayedColumns = ["no","estilista","fecha_cita","servicio","estatus","opciones"];
}
