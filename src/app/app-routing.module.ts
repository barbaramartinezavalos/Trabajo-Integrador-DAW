import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';

const routes: Routes = [
  { path: '', redirectTo: 'crear', pathMatch: 'full' },
  { path: 'crear', component: CrearEncuestaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
