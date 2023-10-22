import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EstilistaService } from '../services/estilista.services';
import { UsuarioService } from '../services/usuario.services';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estilistas',
  templateUrl: './estilistas.component.html',
  styleUrls: ['./estilistas.component.css'],
})
export class EstilistasComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['no', 'nombre', 'servicios', 'opciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _usuarioService: UsuarioService
  ) {
    this.getAllEstilistas();
  }

  getAllEstilistas() {
    this._usuarioService.getUsuarios().subscribe((then) => {
      this.dataSource = new MatTableDataSource(then);
      this.dataSource.paginator = this.paginator;
    });
  }

  async eliminarEstilista(estilista:any){
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
      this._usuarioService.destroyUsuario(estilista).subscribe(
        then => {

          Swal.fire("El Estilista se elimino con exito","","success");
          this.getAllEstilistas()
        }
      );
    }
  }

}
