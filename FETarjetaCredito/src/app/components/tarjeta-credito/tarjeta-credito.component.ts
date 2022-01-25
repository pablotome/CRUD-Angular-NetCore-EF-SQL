import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas: any[] = [
    {"titular": "Juan Perez", "numeroTarjeta": "123456789", "fechaExpiracion": "11/23", "cvv": "123"}, 
    {"titular": "Miguel Gonzalez", "numeroTarjeta": "987654321", "fechaExpiracion": "10/22", "cvv": "321"}, 
  ];

  form: FormGroup;
  accion: string = "Agregar tarjeta";
  id: number | undefined;

  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService, 
    private _tarjetaService : TarjetaService) {
    this.form = this.fb.group({
      titular: ['', Validators.required], 
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]], 
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]], 
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]], 
    });
  }

  ngOnInit(): void {
    this.obtenerListTarjetas();
  }

  obtenerListTarjetas() {
    this._tarjetaService.getTarjetas().subscribe(
      data => {
        console.log(data);
        this.listTarjetas = data;
      }, 
      error => {
        console.log(error);
      });
  }

  guardarTarjeta() {

    console.log(this.form);

    const tarjeta: any = {
      titular: this.form.get('titular')?.value, 
      numeroTarjeta: this.form.get('numeroTarjeta')?.value, 
      fechaExpiracion: this.form.get('fechaExpiracion')?.value, 
      cvv: this.form.get('cvv')?.value, 
    }

    if (this.id == undefined) {
      this._tarjetaService.guardarTarjeta(tarjeta).subscribe(
        data => {
          this.toastr.success('La tarjeta fue registrada ' + tarjeta.numeroTarjeta + ' con éxito', 'Tarjeta registrada');
          this.obtenerListTarjetas();
          this.form.reset();
        }, 
        error => {
          this.toastr.error('Opss... ocurrió un error.....', 'Error');
          console.log(error);
        });
    }
    else {
      tarjeta.id = this.id;
      this._tarjetaService.actualizarTarjeta(this.id, tarjeta).subscribe(
        data => {
          this.form.reset();
          this.accion = "Agregar Tarjeta";
          this.id = undefined;
          this.toastr.info('La tarjeta fue actualizada con éxito', 'Tarjeta actualizada');
          this.obtenerListTarjetas();
        }, 
        error => {
          console.log(error);
        });
    }

    
    //this.listTarjetas.push(tarjeta);
  }

  eliminarTarjeta(index: number, id: number) {
    
    this._tarjetaService.deleteTarjeta(id).subscribe(
      data => {
        this.toastr.error('La tarjeta ' + this.listTarjetas[index].numeroTarjeta + ' fue eliminada', 'Tarjeta eliminada');
        this.obtenerListTarjetas();
      }, 
      error => {
        console.log(error);
      })
    //this.listTarjetas.splice(index, 1);
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'Editar Tarjeta';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular, 
      numeroTarjeta: tarjeta.numeroTarjeta, 
      fechaExpiracion: tarjeta.fechaExpiracion, 
      cvv: tarjeta.cvv,       
    });
  }

}
