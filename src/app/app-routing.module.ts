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
     
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AllHttpInterceptor, multi: true }],
})
export class AppRoutingModule { }
