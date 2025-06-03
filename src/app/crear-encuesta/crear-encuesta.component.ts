import { Component } from '@angular/core';
import { EncuestaService } from '../servicios/encuesta.service';
import { Router } from '@angular/router';

interface Pregunta {
  texto: string;
  tipo: 'abierta' | 'opcion-simple' | 'opcion-multiple';
  opciones: string[];
}

@Component({
  selector: 'app-crear-encuesta',
  standalone: false,
  templateUrl: './crear-encuesta.component.html',
  styleUrl: './crear-encuesta.component.scss'
})
export class CrearEncuestaComponent {
  preguntas: Pregunta[] = [
    {
      texto: '',
      tipo: 'opcion-simple',
      opciones: ['']
    }
  ];

  idGenerado: string = '';

  constructor(
    private encuestaService: EncuestaService,
    private router: Router
  ) {}

  agregarPregunta() {
    this.preguntas.push({
      texto: '',
      tipo: 'opcion-simple',
      opciones: ['']
    });
  }

  eliminarPregunta(index: number) {
    this.preguntas.splice(index, 1);
  }

  agregarOpcion(pIndex: number) {
    this.preguntas[pIndex].opciones.push('');
  }

  eliminarOpcion(pIndex: number, oIndex: number) {
    this.preguntas[pIndex].opciones.splice(oIndex, 1);
  }

  crearEncuesta() {
    const nuevaEncuesta = {
      preguntas: this.preguntas,
      fecha: Date.now()
    };

    const id = this.encuestaService.crearEncuesta(nuevaEncuesta);
    this.idGenerado = id;
  }

  copiarAlPortapapeles(texto: string) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('¡Enlace copiado al portapapeles!');
    });
  }
}
