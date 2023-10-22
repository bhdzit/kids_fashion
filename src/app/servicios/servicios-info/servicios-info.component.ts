import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoVO } from 'src/app/models/producto.model';
import { ServicioVO } from 'src/app/models/servicio.model';
import { ProductoService } from 'src/app/services/producto.service';
import { ServicioService } from 'src/app/services/servicios.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios-info-dialog',
  templateUrl: './servicios-info.component.html',
  styleUrls: ['./servicios-info.component.css'],
})
export class ServiciosInfoComponent {
  submitErrorMsg: any = {};
  submitErrorMsg2: any = {};
  servicioVO: ServicioVO = {
    nombre: '',
    productos: [],
    tiempo: 0,
    costo: 0,
  };

  producto: any = {
    producto: null,
    cantidad: null,
  };
  productosList: ProductoVO[] = [];

  showProductoFrom: boolean = false;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['no', 'producto', 'cantidad', 'opciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private _servicioservice: ServicioService,
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _router: Router
  ) {
    this._route.params.subscribe((params) => {
      if (params['id']) {
        this.getById(params['id']);
      }
    });
    this.dataSource.paginator = this.paginator;
    this.getProductos();
  }
  getProductos() {
    this._productoService.getProductos().subscribe((then) => {
      this.productosList = then;
    });
  }
  getById(id: number) {
    this._servicioservice.getServicio(id).subscribe((then) => {
      if (then.length > 0){
       this.servicioVO = then[0];
       this.getProductosOfServices();
      }
    });
  }

  guardarServicio() {
    this._servicioservice.saveServicio(this.servicioVO).subscribe((then) => {
      if ('errors' in then) {
        this.submitErrorMsg = then.errors;
      } else {
        Swal.fire(
          'El Servicio se agrego con exito',
          'Ahora pudes agregar productos!',
          'success'
        ).then(() => {
          this._router.navigate(['servicios/editar/' + then.id]);
        });
        // this.dialog.close({ data: then });
      }
    });
  }

  agregarProductoUtilizado() {
    this.showProductoFrom = true;
    setTimeout(() => {
      this.dataSource.paginator?.lastPage();
    }, 500);
  }

  guardarProdcutoUtilizado() {
    this.producto.producto = Number(this.producto.producto);
    this.producto.servicio = this.servicioVO.id;
    this._servicioservice
      .saveProductoOfServicio(this.producto)
      .subscribe((then) => {
        if ('errors' in then) {
          this.submitErrorMsg2 = then.errors;
        } else {
          Swal.fire('El producto se '+ (this.producto.id? "actualizo":"agrego") +' con exito!', '', 'success').then(
            () => {
              this.showProductoFrom = false;
              this.producto = {};
              this.submitErrorMsg2 = {};
              this.getProductosOfServices();
            }
          );
          // this.dialog.close({ data: then });
        }
      });
  }

  getProductosOfServices() {
    if (this.servicioVO.id != undefined)
      this._servicioservice.getProdcutosOfServicio(this.servicioVO.id)
        .subscribe((then) => {
          this.dataSource = new MatTableDataSource(then);
          this.dataSource.paginator = this.paginator;
        });
  }

  editarProductoDeServicio(element:any){
    this.producto={...element};
    this.producto.producto = this.producto.producto.id;
    this.showProductoFrom = true; 
  }

 async eliminarProductoDeServicio(element:any){
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
      this._servicioservice.destroyProdcutosOfServicio(element).subscribe(
        then => {
          this.getProductosOfServices();
          Swal.fire("El producto se elimino con exito","","success");
        }
      );
    }
  }

}
