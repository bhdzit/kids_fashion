import { Component, ViewChild } from '@angular/core';
import { ClientesInfoComponent } from './clientes-info/clientes-info.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteVo } from '../models/cliente.model';
import { ClientesService } from '../services/clientes.service';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent {
  dataSource: MatTableDataSource<ClienteVo> = new MatTableDataSource();
  displayedColumns = [
    'no',
    'nombre',
    'padre',
    'correo',
    'telefono',
    'ultimoCorte',
    'opciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _clienteServices: ClientesService
  ) {
    this.getClientes();
  }

  getClientes() {
    this._clienteServices.getClientes().subscribe((then) => {
      this.dataSource = new MatTableDataSource(then);
      this.dataSource.paginator = this.paginator;
    });
  }

  agregarCliente() {
    setTimeout(() => {
      this.dataSource.paginator?.lastPage();
    }, 500);
    const dialogRef = this._dialog.open(ClientesInfoComponent, {
      width: '50vw',
      enterAnimationDuration: '1000ms',
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

  editarCliente(cliente: ClienteVo) {
    const dialogRef = this._dialog.open(ClientesInfoComponent, {
      width: '50vw', enterAnimationDuration: "1000ms",
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && "data" in result) {
        this.dataSource.data = result.data;
      }
    });

  }

  async eliminarCliente(cliente:ClienteVo){
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

    // you logic goes here, whatever that may be 
    // and it must return either True or False

    if (res.isConfirmed) {
      this._clienteServices.destroyClientes(cliente).subscribe(
        then => {
          this.dataSource.data = then;
        }
      );
    }
  }



}
