import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';
import { ResponderComponent } from './responder/responder.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { InicioComponent } from './inicio/inicio.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { AgradecimientoComponent } from './agradecimiento/agradecimiento.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearEncuestaComponent,
    ResponderComponent,
    EstadisticasComponent,
    InicioComponent,
    BienvenidaComponent,
    AgradecimientoComponent
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

