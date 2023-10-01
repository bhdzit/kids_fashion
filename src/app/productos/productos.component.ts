import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  dataSource:MatTableDataSource<any[]> = new MatTableDataSource();
  displayedColumns = ["no","producto","cantidad","opciones"];

}
