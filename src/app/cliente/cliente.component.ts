import { Component } from '@angular/core';
import { ClientesInfoComponent } from './clientes-info/clientes-info.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteVo } from '../models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  dataSource:MatTableDataSource<ClienteVo[]> = new MatTableDataSource();
  displayedColumns = ["no","nombre","padre","correo","telefono","ultimoCorte","opciones"];

  constructor(private _dialog: MatDialog){
    const dialogRef = this._dialog.open(ClientesInfoComponent, {
      width: '50vw', enterAnimationDuration: "1000ms"
    });

  }

  agregarCliente() {
    setTimeout(() => {
      this.dataSource.paginator?.lastPage();

    }, 500);
    const dialogRef = this._dialog.open(ClientesInfoComponent, {
      width: '50vw', enterAnimationDuration: "1000ms"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && "data" in result) {
        this.dataSource.data = result.data;
        setTimeout(() => {
          this.dataSource.paginator?.lastPage();

        }, 500);
      }
    });
  }

}
