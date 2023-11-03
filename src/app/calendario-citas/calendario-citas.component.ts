import { Component, ChangeDetectorRef } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendario-citas',
  templateUrl: './calendario-citas.component.html',
  styleUrls: ['./calendario-citas.component.css'],
})
export class CalendarioCitasComponent {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    locale: esLocale,
    eventTimeFormat:{
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false
    },
  };
  currentEvents: EventApi[] = [];

  constructor(private _citasService: CitasService) {
    this.getCitas();
  }

  getCitas() {
    this._citasService.getCitas().subscribe((then) => {
      then.map((item:any) => {
        let fechaFin = new Date();
        
        if (item.fecha != undefined)
          fechaFin = this.addMinutes(new Date(item.fecha), (item.servicio as any).tiempo);
        const cita = {
          id: createEventId(),
          title: (item.servicio as any).nombre+" - "+item.estilista.nombre,
          start: item.fecha?.toString().replace('.000Z', ''),
          end:fechaFin.toISOString().replace('.000Z', ''),
          color:"#0f0"
        };        
        INITIAL_EVENTS.push(cita);
        this.calendarOptions.events = INITIAL_EVENTS;
      });
    });
  }

  addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
  }
}

import { EventInput } from '@fullcalendar/core';
import { CitasService } from '../services/citas.services';

let eventGuid = 0;

export const INITIAL_EVENTS: EventInput[] = [
];

export function createEventId() {
  return String(eventGuid++);
}
