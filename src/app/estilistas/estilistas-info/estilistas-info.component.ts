import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarApi, CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { UsuarioService } from 'src/app/services/usuario.services';
import { ServicioVO } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicios.services';
import { ActivatedRoute, Router } from '@angular/router';
import { EstilistaService } from 'src/app/services/estilista.services';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import esLocale from '@fullcalendar/core/locales/es';
import { HorarioVO } from 'src/app/models/horario.model';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-estilistas-info',
  templateUrl: './estilistas-info.component.html',
  styleUrls: ['./estilistas-info.component.css'],
})
export class EstilistasInfoComponent implements OnInit {
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource();
  displayedColumns = ['no', 'servicio', 'opciones'];
  submitErrorMsg: any = {};
  i: number = 0;
  expnade = 3;
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, timeGridPlugin],
    headerToolbar: {
      left: '',
      center: '',
      right: '',
    },
    initialView: 'timeGridWeek',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot:false,

    locale: esLocale,
    eventTimeFormat:{
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false
    },
    slotMinTime:"08:00:00",
    slotMaxTime:"22:00:00",
    slotLabelFormat: [
      { hour:"2-digit",minute:"2-digit"}, // top level of text
      { week:"long"} // lower level of text
    ],
    select: this.handleDateSelect.bind(this),
  };

  usuarioVO: any = {};
  showServiciosForm: boolean = false;
  servicioList: ServicioVO[] = [];
  servicioVO: any = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  _calendarApi!:CalendarApi;

  idEstilista!:number;
  constructor(
    private _usuarioService: UsuarioService,
    private _servicioService: ServicioService,
    private _route: ActivatedRoute,
    private _estilistaService: EstilistaService,
    private _router: Router
  ) {
    this.getServicios();
    this._route.params.subscribe((params) => {
      if (params['id']) {
        this.getById(params['id']);
      }
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this._calendarApi = this.calendarComponent.getApi();      
    }, 1000);
  }

  getById(id: number) {
    this.idEstilista=id;
    this._usuarioService.getUsuario(id).subscribe((then) => {
      this.usuarioVO = then[0];
      this.getHorariosEstilista(id)
    });
    this.getServiciosOfEstilista(id);
    this.expnade = 3;
  }

  getServiciosOfEstilista(id: number) {
    this._estilistaService.getServiciosOfEstilista(id).subscribe((then) => {
      this.dataSource = new MatTableDataSource(then);
      this.dataSource.paginator = this.paginator;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    if(this._calendarApi==undefined)this._calendarApi = selectInfo.view.calendar;
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    
    calendarApi.addEvent({
      id: this.i-- + '',
      title: '',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  }

  getServicios() {
    this._servicioService.getAllServicios().subscribe((then) => {
      this.servicioList = then;
    });
  }

  guardarEstilistas() {
    this._usuarioService.saveUsuario(this.usuarioVO).subscribe((then) => {
      if ('errors' in then) {
        this.submitErrorMsg = then.errors;
      } else {
        Swal.fire(
          'El Estilista se agrego con exito','',
          'success'
        ).then(() => {
          this._router.navigate(['estilistas/editar/' + then.id]);
        });
      }
    });
  }

  agregarServicio() {
    this.showServiciosForm = true;
  }

  guardarServicio() {
    this.servicioVO.servicio = Number(this.servicioVO.servicio);
    this.servicioVO.usuario = Number(this.usuarioVO.id);
    this._estilistaService
      .saveServicioOfEstilista(this.servicioVO)
      .subscribe((then) => this.getServiciosOfEstilista(this.usuarioVO.id));
  }

  editarServicio(element:any){
    console.log(element);
    this.servicioVO={...element};
    this.servicioVO.servicio = this.servicioVO.servicio.id;
    this.showServiciosForm = true; 
  }

  async eliminarServicio(servicio:any){
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
      this._estilistaService.destroyServicioOfEstilista(servicio).subscribe(
        then => {

          Swal.fire("El Servicio se elimino con exito","","success");
          this.getServiciosOfEstilista(this.usuarioVO.id)
        }
      );
    }
  }

  matchDayOfWeek(day:string):Date{
    const date = new Date(day);
    const newDate = new Date();
    newDate.setDate(newDate.getDate()-(newDate.getDay()-date.getDay()))
    newDate.setHours(date.getHours())
    newDate.setMinutes(date.getMinutes());
    return newDate;
  }

  getHorariosEstilista(id:number){
    this._estilistaService.getHorarioEstilista(id).subscribe(then=>{
      const horarioList:any[]=[];
      then.map(item=>{
        const start:Date=this.matchDayOfWeek(item.start);
        const end = this.matchDayOfWeek(item.end);
        console.log(start);
        
        const horario={
          id: item.id,
          title: '',
          start: start,
          end: end,
        }
        horarioList.push(horario);
      });
      this.calendarOptions.events=horarioList;
    });
  }

  guardarHorarioDeTrabajo(){
    const horarios = this._calendarApi.getEvents();
    horarios.map(item=>{
      let horario:HorarioVO={
        id:Number(item.id),
        start: item.start,
        end: item.end,
        diaSeman: item.start?.getDay()||-1,
        usuario:this.idEstilista
      };
      this._estilistaService.saveHorarioEstilista(horario).subscribe();
    });
  }
}
