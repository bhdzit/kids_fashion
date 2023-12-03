import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitaVO } from 'src/app/models/cita.model';
import { UsuarioVO } from 'src/app/models/usuario.model';
import { CitasService } from 'src/app/services/citas.services';
import { ClientesService } from 'src/app/services/clientes.service';
import { PagoServicioService } from 'src/app/services/tickets.services';
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
  observaciones:string="";

  constructor(private _estilistaService: UsuarioService, private _clientesService:ClientesService,private _pagoServicioService:PagoServicioService,private _route: ActivatedRoute,private _citasService:CitasService){
   
    this.getEstilistas();
    this.getCliente();

    this._route.params.subscribe((params) => {
      if (params['id']) {
        this.getById(params['id']);
      }
    });
  
  }

  getById(id:number){
    this._citasService.getCitaById(id).subscribe(then=>{
      const cita:any = then[0];      
      this.citaVO["id"] = cita.id
      this.citaVO.estilista= cita.estilista.id;
      this.cambioEstilista(null);
      this.citaVO.servicio= cita.servicio.id;
      this.citaVO.cliente= cita.cliente.id;
      let fecha:string = cita.fecha+"";
      fecha=fecha.replace(/:\d\d\..*$/, '');
      
      (this.citaVO as any).fecha = fecha;
      this.calcularTotal();
      
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

  getCliente(){
    this._clientesService.getClientes().subscribe(then=>{
      this.clientesArray = then;
    });
  }

  cerrar(){

  }
  guardarCita(){
    const request = {
      cita:this.citaVO,
      total:this.total,
      observaciones:this.observaciones
    }
    this._pagoServicioService.savePagoServicio(request).subscribe(then=>{
      if ('errors' in then) {
        this.submitErrorMsg = then.errors;
      }
      
    })
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
