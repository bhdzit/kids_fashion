import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {

  dataSource:MatTableDataSource<any[]> = new MatTableDataSource();
  displayedColumns = ["no","nombre","producto","tiempo","costo","opciones"];

  constructor(private _dialog: MatDialog){

  }
}
