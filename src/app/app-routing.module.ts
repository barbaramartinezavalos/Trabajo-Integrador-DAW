import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';
import { ResponderComponent } from './responder/responder.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { InicioComponent } from './inicio/inicio.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';


const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  { path: '', component: BienvenidaComponent },
  { path: '', redirectTo: 'crear', pathMatch: 'full' },
  { path: 'crear', component: CrearEncuestaComponent },
  { path: 'responder/:id', component: ResponderComponent },
  { path: 'estadisticas/:id', component: EstadisticasComponent },
  { path: '', component: InicioComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
