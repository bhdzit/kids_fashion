import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllHttpInterceptor } from './allhttp.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { DeactivateGuard } from './deactivate-guard';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import { GoogleMapsModule } from '@angular/google-maps';
import { ClienteComponent } from './cliente/cliente.component';
import { ClientesInfoComponent } from './cliente/clientes-info/clientes-info.component';
import { FormErrorDirective } from './services/form-error.directive';
import { ProductosComponent } from './productos/productos.component';
import { ProductosInfoComponent } from './productos/productos-info/productos-info.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ServiciosInfoComponent } from './servicios/servicios-info/servicios-info.component';
import { EstilistasComponent } from './estilistas/estilistas.component';
import { EstilistasInfoComponent } from './estilistas/estilistas-info/estilistas-info.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import {MatExpansionModule} from '@angular/material/expansion';
import { CitasComponent } from './citas/citas.component';
import { CitasInfoComponent } from './citas-info/citas-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ClienteComponent,
    ClientesInfoComponent,
    FormErrorDirective,
    ProductosComponent,
    ProductosInfoComponent,
    ServiciosComponent,
    ServiciosInfoComponent,
    EstilistasComponent,
    EstilistasInfoComponent,
    CitasComponent,
    CitasInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSortModule,
    MatRadioModule,
    GoogleMapsModule,
    FullCalendarModule,
    MatExpansionModule
  ],
  providers: [AllHttpInterceptor,DeactivateGuard, {
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
