import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-encuesta',
  standalone: false,
  templateUrl: './crear-encuesta.component.html',
  styleUrl: './crear-encuesta.component.scss'
})
export class CrearEncuestaComponent {
  pregunta: string = '';
  tipo: 'abierta' | 'opcion-simple' | 'opcion-multiple' = 'opcion-simple';
  opciones: string[] = [''];

  agregarOpcion() {
    this.opciones.push('');
  }

  eliminarOpcion(index: number) {
    this.opciones.splice(index, 1);
  }

  crearEncuesta() {
    console.log({
      pregunta: this.pregunta,
      tipo: this.tipo,
      opciones: this.opciones
    });
    alert('Encuesta creada (en consola)');
  }

}
