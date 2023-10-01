import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoVO } from 'src/app/models/producto.model';

@Component({
  selector: 'app-productos-info',
  templateUrl: './productos-info.component.html',
  styleUrls: ['./productos-info.component.css']
})
export class ProductosInfoComponent {
  submitErrorMsg:any={};
  productoVO:ProductoVO={
    producto: '',
    cantidad: 0
  }

  constructor(public dialog: MatDialogRef<ProductosInfoComponent>){}

  cerrar(){

  }

  guardarProducto(){

  }
}
