import { Injectable } from '@angular/core';
import { Encuesta, Pregunta } from '../modelos/encuesta.model';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private encuestas: Encuesta[] = [];

  constructor() {
    const data = localStorage.getItem('encuestas');
    if (data) {
      this.encuestas = JSON.parse(data);
    }
  }

  crearEncuesta(encuesta: Omit<Encuesta, 'id'>): string {
    const id = crypto.randomUUID();
    const nuevaEncuesta: Encuesta = {
      id,
      ...encuesta,
      preguntas: encuesta.preguntas.map(p => ({ ...p, respuestas: [] }))
    };
    this.encuestas.push(nuevaEncuesta);
    this.guardar();
    return id;
  }

  obtenerEncuesta(id: string): Encuesta | undefined {
    return this.encuestas.find(e => e.id === id);
  }

  responderEncuesta(id: string, respuestas: any[]) {
    const encuesta = this.obtenerEncuesta(id);
    if (encuesta) {
      encuesta.preguntas.forEach((pregunta, index) => {
        if (!pregunta.respuestas) pregunta.respuestas = [];
        pregunta.respuestas.push(respuestas[index]);
      });
      this.guardar();
    }
  }

  actualizarEncuesta(encuestaActualizada: Encuesta) {
    const index = this.encuestas.findIndex(e => e.id === encuestaActualizada.id);
    if (index !== -1) {
      this.encuestas[index] = encuestaActualizada;
      this.guardar();
    }
  }

  private guardar() {
    localStorage.setItem('encuestas', JSON.stringify(this.encuestas));
  }
}
