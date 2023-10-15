import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Servicioservice } from '../services/servicios.services';
import { ServicioVO } from '../models/servicio.model';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {

  dataSource:MatTableDataSource<ServicioVO> = new MatTableDataSource();
  displayedColumns = ["no","nombre","producto","tiempo","costo","opciones"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _dialog: MatDialog,private _servicioservice:Servicioservice){
    this.getServicios();
  }

  getServicios() {
    this._servicioservice.getAllServicios().subscribe((then) => {
      this.dataSource = new MatTableDataSource(then);
      this.dataSource.paginator = this.paginator;
    });
  }

  async eliminarServicio(servicio:ServicioVO){
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
      this._servicioservice.destroyServicio(servicio).subscribe(
        then => {
          this.dataSource.data = then;
          Swal.fire("El Servicio se elimino con exito","","success");
        }
      );
    }
  }



}
