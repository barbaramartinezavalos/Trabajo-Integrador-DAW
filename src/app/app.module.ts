import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';
import { ResponderComponent } from './responder/responder.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearEncuestaComponent,
    ResponderComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,            
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

