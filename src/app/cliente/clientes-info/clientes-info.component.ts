import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteVo } from 'src/app/models/cliente.model';
@Component({
  selector: 'app-clientes-info',
  templateUrl: './clientes-info.component.html',
  styleUrls: ['./clientes-info.component.css']
})
export class ClientesInfoComponent implements OnInit, AfterViewInit {

  submitErrorMsg: any = {};
  clienteVO: ClienteVo = {
  };


  constructor(public dialog: MatDialogRef<ClientesInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: ClienteVo, private _clientesService: ClientesService) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {


  }

  coordsChangeEvent(evt: any) {
    console.log(evt);
  }

  guardarCliente() {

  }

  formatoTel(event: KeyboardEvent) {

    let { key } = event;
    console.log(key);
    if (key == "Backspace" || key == "ArrowLeft" || key == "ArrowRight") return true;

    let input = event.target as HTMLInputElement;
    if (input.value.length == 0) {
      input.value = "(" + key + ")";
      input.setSelectionRange(2, 2);
      return false;
    }

    return !(Number.isNaN(Number(key)));
    //input.value += key;
  }

}
