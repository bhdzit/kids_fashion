import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-estilistas',
  templateUrl: './estilistas.component.html',
  styleUrls: ['./estilistas.component.css']
})
export class EstilistasComponent {
  dataSource:MatTableDataSource<any[]> = new MatTableDataSource();
  displayedColumns = ["no","nombre","servicios","opciones"];
}
