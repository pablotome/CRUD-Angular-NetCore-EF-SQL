import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private myAppURL: string = 'https://localhost:44342/';
  private myApIURL: string = 'api/tarjeta/';

  constructor(private http: HttpClient) { }

  getTarjetas(): Observable<any> {
    return this.http.get(this.myAppURL+this.myApIURL);
  }

  deleteTarjeta(id: number): Observable<any> {
    return this.http.delete(this.myAppURL+this.myApIURL+id);
  }

  guardarTarjeta(tarjeta: any): Observable<any> {
    return this.http.post(this.myAppURL+this.myApIURL, tarjeta);
  }

  actualizarTarjeta(id: number, tarjeta: any): Observable<any> {
    return this.http.put(this.myAppURL+this.myApIURL+id, tarjeta);
  }

  

}
