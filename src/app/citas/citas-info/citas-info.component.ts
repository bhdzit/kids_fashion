import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CitaVO } from 'src/app/models/cita.model';
import { ServicioVO } from 'src/app/models/servicio.model';
import { UsuarioVO } from 'src/app/models/usuario.model';
import { CitasService } from 'src/app/services/citas.services';
import { ClientesService } from 'src/app/services/clientes.service';
import { UsuarioService } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-citas-info',
  templateUrl: './citas-info.component.html',
  styleUrls: ['./citas-info.component.css'],
})
export class CitasInfoComponent {
  submitErrorMsg: any;
  citaVO: CitaVO = {
    estilista: 0,
    servicio: 0,
    fecha: undefined,
  };
  estilistasList: UsuarioVO[] = [];
  serviciosEstilista: any[] = [];

  clientesList:any[]=[]

  constructor(
    private _estilistaService: UsuarioService,
    private _citasService: CitasService,
    private _clienteServices:ClientesService,
    @Inject(MAT_DIALOG_DATA) public data: CitaVO,
    public dialog: MatDialogRef<CitasInfoComponent>
  ) {
    if (this.data != null) {
      this.citaVO = {...data};
      this.citaVO.estilista = (this.citaVO.estilista as any).id;
      this.citaVO.servicio = (this.citaVO.servicio as any).id;
//      this.citaVO.fecha = (this.citaVO.fecha as any).replace(".000Z","");
      let fecha:string = this.citaVO.fecha+"";
      fecha=fecha.replace(/:\d\d\..*$/, '');
      (this.citaVO as any).fecha =fecha;
            
    }

    this.getEstilistas();
    this.getClientes();
  }

  getClientes(){
    this._clienteServices.getClientes().subscribe(then=>{
      this.clientesList=then;
    })
  }

  getEstilistas() {
    this._estilistaService.getUsuarios().subscribe((then) => {
      this.estilistasList = then;
      if (this.citaVO.id) {
        setTimeout(() => {
          this.cambioEstilista(null)
        }, 1000);
      }
    });
  }

  cambioEstilista(evt: Event|null) {
    const estilistaSelecionado = this.estilistasList.filter(
      (item) => item.id == this.citaVO.estilista
    )[0];
    if (estilistaSelecionado.servicios != undefined)
      this.serviciosEstilista = estilistaSelecionado.servicios;
  }

  guardarCita() {
    this.citaVO.estilista = Number(this.citaVO.estilista);
    this.citaVO.servicio = Number(this.citaVO.servicio);
    this._citasService.saveCita(this.citaVO).subscribe((then) => {
      if ('errors' in then) {
        this.submitErrorMsg = then.errors;
      } else {
        this.dialog.close({ data: then });
      }
    });
  }

  cerrar() {
    this.dialog.close();
  }
}
