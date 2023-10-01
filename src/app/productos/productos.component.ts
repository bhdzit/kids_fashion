import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductosInfoComponent } from './productos-info/productos-info.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent{

  dataSource:MatTableDataSource<any[]> = new MatTableDataSource();
  displayedColumns = ["no","producto","cantidad","opciones"];

  constructor(private _dialog: MatDialog){
    const dialogRef = this._dialog.open(ProductosInfoComponent, {
      width: '50vw', enterAnimationDuration: "1000ms"
    });
  }

}
