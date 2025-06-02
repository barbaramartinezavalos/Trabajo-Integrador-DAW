import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';
import { ResponderComponent } from './responder/responder.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

const routes: Routes = [
  { path: '', redirectTo: 'crear', pathMatch: 'full' },
  { path: 'crear', component: CrearEncuestaComponent },
  { path: 'responder/:id', component: ResponderComponent },
  { path: 'estadisticas/:id', component: EstadisticasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
