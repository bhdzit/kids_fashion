import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductoVO } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-info',
  templateUrl: './productos-info.component.html',
  styleUrls: ['./productos-info.component.css']
})
export class ProductosInfoComponent {
  submitErrorMsg:any={};
  productoVO:ProductoVO={
    nombre: '',
    cantidad: 0
  }

  constructor(public dialog: MatDialogRef<ProductosInfoComponent>,
              private _productoService:ProductoService){}

  cerrar(){

  }

  guardarProducto() {
    console.log(this.productoVO);
    this._productoService.saveProducto(this.productoVO).subscribe((then) => {
      if ('errors' in then) {
        this.submitErrorMsg = then.errors;
      }
      else{
        this.dialog.close({data:then});
      }
    });
  }

}
