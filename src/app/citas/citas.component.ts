import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CitasInfoComponent } from './citas-info/citas-info.component';
import { CitasService } from '../services/citas.services';
import { MatPaginator } from '@angular/material/paginator';
import { CitaVO } from '../models/cita.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {
  dataSource:MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ["no","estilista","fecha_cita","servicio","estatus","opciones"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _dialog: MatDialog,
              private _citasServices:CitasService){
                this.getData();
              }

  getData(){
    this._citasServices.getCitas().subscribe(then=>{
      this.dataSource = new MatTableDataSource(then);
      this.dataSource.paginator = this.paginator;      
    });
  }

  agregarCita(){
    setTimeout(() => {
      this.dataSource.paginator?.lastPage();
    }, 500);
    const dialogRef = this._dialog.open(CitasInfoComponent, {
      width: '50vw',
      enterAnimationDuration: '1000ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined && 'data' in result) {
        this.getData()
        setTimeout(() => {
          this.dataSource.paginator?.lastPage();
        }, 500);
      }
    });
  }

  formateDate(fecha:string):string{
    let time = fecha.split("T")[1];
    time = time.replace(".000Z","");
    
    const date:Date = new Date(fecha);
    date.setHours(Number(time.split(":")[0]));
  
    return date.toLocaleDateString() + " "+ date.toLocaleTimeString();
  }

  editarCita(cita: CitaVO) {

    const dialogRef = this._dialog.open(CitasInfoComponent, {
      width: '50vw', enterAnimationDuration: "1000ms",
      data: cita
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && "data" in result) {
        this.getData()
      }
    });

  }

  async eliminarCita(cita:CitaVO){
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

    if (res.isConfirmed) {
      this._citasServices.destroyCita(cita).subscribe(
        then => {
         this.getData()
        }
      );
    }
  }


}
