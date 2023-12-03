import { Component } from '@angular/core';
import { CitaVO } from 'src/app/models/cita.model';
import { UsuarioVO } from 'src/app/models/usuario.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { UsuarioService } from 'src/app/services/usuario.services';

@Component({
  selector: 'app-pago-servicio-info',
  templateUrl: './pago-servicio-info.component.html',
  styleUrls: ['./pago-servicio-info.component.css']
})
export class PagoServicioInfoComponent {
  submitErrorMsg: any;
  estilistasList: UsuarioVO[] = [];
  serviciosEstilista: any[] = [];
  clientesArray:any[]=[];
  promocionesList:any[] =[{id:1,nombre:"Promocion 1", descuento:10},{id:2,nombre:"Promocion 2", descuento:10},{id:3,nombre:"Promocion 3", descuento:10}];
  promocionSelecionada=null;
  listaDePromocionesSelecionadas:any = [];
  citaVO: CitaVO = {
    estilista: 0,
    servicio: 0,
    fecha: undefined,
    cliente:0,
  };
  total=0;

  constructor(private _estilistaService: UsuarioService, private _clientesService:ClientesService){
    this.getEstilistas();
    this.getCliente();
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

  getCliente(){
    this._clientesService.getClientes().subscribe(then=>{
      this.clientesArray = then;
    });
  }

  cerrar(){

  }
  guardarCita(){

  }

  agregarPromocion(){
    const promocion = this.promocionesList.filter(item=>item.id==this.promocionSelecionada);
    this.listaDePromocionesSelecionadas.push(promocion[0]);
    this.promocionSelecionada = null;
    this.calcularTotal();
  }

  eliminarPromocion(promocion:any){
    const promocionAEliminar = this.listaDePromocionesSelecionadas.map((e:any) => e.id).indexOf(promocion.id);
    this.listaDePromocionesSelecionadas.splice(promocionAEliminar,1);
  }

  calcularTotal(){
    const serviciosSelecionado = this.serviciosEstilista.filter(item=>item.servicio.id==this.citaVO.servicio)[0];
    this.total = serviciosSelecionado.servicio.costo;

    this.listaDePromocionesSelecionadas.map((item:any)=>{
      this.total = this.total - item.descuento;
      
    })
  }

}
