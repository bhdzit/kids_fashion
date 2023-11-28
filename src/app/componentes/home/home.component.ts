import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private _authService: AuthService, private _router: Router){}

  links=[
   {ruta:"dashboard", icono:"fas fa-broadcast-tower", name:"Dashboard"},
   {ruta:"pagos-servicio", icono:"fas fa-shopping-cart", name:"Pagos Servicio"},
   {ruta:"clientes", icono:"fas fa-users", name:"Clientes"},
   {ruta:"estilistas", icono:"fas fa-user-tie", name:"Estilistas"},   
   {ruta:"citas", icono:"fas fa-calendar-check", name:"Citas"},
   {ruta:"productos", icono:"fas fa-wine-bottle", name:"Productos"},
   {ruta:"servicios", icono:"fas fa-cut", name:"Servicios"},   
  ]

  logOut(){
    this._authService.setToken("");
    this._router.navigate(["login"]);
  }
}
