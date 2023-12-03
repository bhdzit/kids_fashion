import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromocionVO } from 'src/app/models/promocion.model';
import { PromocionesService } from 'src/app/services/promociones.services';

@Component({
  selector: 'app-promociones-info',
  templateUrl: './promociones-info.component.html',
  styleUrls: ['./promociones-info.component.css']
})
export class PromocionesInfoComponent {
  submitErrorMsg: any = {};
  promocionVO:PromocionVO={
    nombre: '',
    descuento: 0
  }
  constructor(
    public dialog: MatDialogRef<PromocionesInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromocionVO,
    private _promocionesService: PromocionesService
  ) {
    if (this.data != null) this.promocionVO = data;
  }


  cerrar() {
    this.dialog.close();
  }

  guardarPromoicion() {
    console.log(this.promocionVO);
    this._promocionesService.saveProducto(this.promocionVO).subscribe((then) => {
      if ('errors' in then) {
        this.submitErrorMsg = then.errors;
      } else {
        this.dialog.close({ data: then });
      }
    });
  }
}
