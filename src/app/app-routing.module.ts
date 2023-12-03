import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AllHttpInterceptor } from './allhttp.interceptor';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { DeactivateGuard } from './deactivate-guard';
import { AuthService } from './services/auth.services';
import { ClienteComponent } from './cliente/cliente.component';
import { ProductosComponent } from './productos/productos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ServiciosInfoComponent } from './servicios/servicios-info/servicios-info.component';
import { EstilistasComponent } from './estilistas/estilistas.component';
import { EstilistasInfoComponent } from './estilistas/estilistas-info/estilistas-info.component';
import { CitasComponent } from './citas/citas.component';
import { CalendarioCitasComponent } from './calendario-citas/calendario-citas.component';
import { PagoServicioComponent } from './pago-servicio/pago-servicio.component';
import { PagoServicioInfoComponent } from './pago-servicio/pago-servicio-info/pago-servicio-info.component';
import { PromocionesComponent } from './promociones/promociones.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent, canActivate: [AuthService] },
  {
    path: '', component: HomeComponent,
//    canActivate: [AuthService],
    canDeactivate: [DeactivateGuard],
    children: [
      {
        path: 'clientes',
        component: ClienteComponent,
      },
      {
        path: 'productos',
        component: ProductosComponent,
      },
      {
        path: 'servicios',
        component: ServiciosComponent,
      },
      {
        path: 'servicios/agregar',
        component: ServiciosInfoComponent,
      },
      {
        path: 'servicios/editar/:id',
        component: ServiciosInfoComponent,
      },
      {
        path: 'estilistas',
        component: EstilistasComponent,
      },
      {
        path: 'estilistas/agregar',
        component: EstilistasInfoComponent,
      },
      {
        path: 'estilistas/editar/:id',
        component: EstilistasInfoComponent,
      },
      {
        path: 'citas',
        component: CitasComponent,
      },
      {
        path: 'citas/calendario-citas',
        component: CalendarioCitasComponent,
      },
      {
        path: 'pagos-servicio',
        component: PagoServicioComponent,
      },
      {
        path: 'pagos-servicio/agregar',
        component: PagoServicioInfoComponent,
      },
      {
        path: 'pagos-servicio/editar/:id',
        component: PagoServicioInfoComponent,
      },
      {
        path: 'promociones',
        component: PromocionesComponent,
      },
     
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AllHttpInterceptor, multi: true }],
})
export class AppRoutingModule { }
