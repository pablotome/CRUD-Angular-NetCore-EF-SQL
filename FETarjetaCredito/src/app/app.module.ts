import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito.component';

@NgModule({
  declarations: [
    AppComponent,
    TarjetaCreditoComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
