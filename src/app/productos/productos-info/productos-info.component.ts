import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoVO } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos-info',
  templateUrl: './productos-info.component.html',
  styleUrls: ['./productos-info.component.css'],
})
export class ProductosInfoComponent {
  submitErrorMsg: any = {};
  productoVO: ProductoVO = {
    nombre: '',
    cantidad: 0,
  };

  constructor(
    public dialog: MatDialogRef<ProductosInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductoVO,
    private _productoService: ProductoService
  ) {
    if (this.data != null) this.productoVO = data;
  }

  cerrar() {
    this.dialog.close();
  }

  guardarProducto() {
    console.log(this.productoVO);
    this._productoService.saveProducto(this.productoVO).subscribe((then) => {
      if ('errors' in then) {
        this.submitErrorMsg = then.errors;
      } else {
        this.dialog.close({ data: then });
      }
    });
  }
}
