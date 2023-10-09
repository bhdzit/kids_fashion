import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductosInfoComponent } from './productos-info/productos-info.component';
import { MatPaginator } from '@angular/material/paginator';
import { ProductoService } from '../services/producto.service';
import { ProductoVO } from '../models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent{

  dataSource:MatTableDataSource<ProductoVO> = new MatTableDataSource();
  displayedColumns = ["no","producto","cantidad","opciones"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _dialog: MatDialog,
              private _productoService:ProductoService){
    this.getProductos();
  }

  getProductos() {
    this._productoService.getProductos().subscribe((then) => {
      this.dataSource = new MatTableDataSource(then);
      this.dataSource.paginator = this.paginator;
    });
  }

  agregarProducto(){
    const dialogRef = this._dialog.open(ProductosInfoComponent, {
      width: '50vw', enterAnimationDuration: "1000ms"
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined && 'data' in result) {
        this.dataSource.data = result.data;
        setTimeout(() => {
          this.dataSource.paginator?.lastPage();
        }, 500);
      }
    });
  }

  editarProducto(producto: ProductoVO) {
    const dialogRef = this._dialog.open(ProductosInfoComponent, {
      width: '50vw', enterAnimationDuration: "1000ms",
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && "data" in result) {
        this.dataSource.data = result.data;
      }
    });

  }

  async eliminarProducto(producto:ProductoVO){
    let res = await Swal.fire({
      title: '¿Estas Seguro?',
      text: "Esta accion es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminar!'
    });

    console.log(res);


    // you logic goes here, whatever that may be 
    // and it must return either True or False

    if (res.isConfirmed) {
      this._productoService.destroyProductos(producto).subscribe(
        then => {
          this.dataSource.data = then;
        }
      );
    }
  }


}
