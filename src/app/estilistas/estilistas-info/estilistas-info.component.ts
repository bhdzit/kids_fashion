
import { MatTableDataSource } from '@angular/material/table';
import { Component, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


@Component({
  selector: 'app-estilistas-info',
  templateUrl: './estilistas-info.component.html',
  styleUrls: ['./estilistas-info.component.css']
})
export class EstilistasInfoComponent {
  dataSource:MatTableDataSource<any[]> = new MatTableDataSource();
  displayedColumns = ["no","servicio","opciones"];
  submitErrorMsg:any={};
  i:number=1;
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      timeGridPlugin,

    ],
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    initialView: 'timeGridWeek',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
  };

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      id: (this.i++)+"",
      title:"Evento n",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    });

  }

}
