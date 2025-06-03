import { Injectable } from '@angular/core';

export interface Pregunta {
  texto: string;
  tipo: 'abierta' | 'opcion-simple' | 'opcion-multiple';
  opciones: string[];
}

export interface Encuesta {
  id: string;
  preguntas: Pregunta[];
  respuestas: any[];
  fecha: number;
}

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

  crearEncuesta(encuesta: Omit<Encuesta, 'id' | 'respuestas'>): string {
    const id = crypto.randomUUID();
    const nuevaEncuesta: Encuesta = {
      ...encuesta,
      id,
      respuestas: []
    };
    this.encuestas.push(nuevaEncuesta);
    this.guardar();
    return id;
  }

  obtenerEncuesta(id: string): Encuesta | undefined {
    return this.encuestas.find(e => e.id === id);
  }

  responderEncuesta(id: string, respuesta: any) {
    const encuesta = this.obtenerEncuesta(id);
    if (encuesta) {
      encuesta.respuestas.push(respuesta);
      this.guardar();
    }
  }

  private guardar() {
    localStorage.setItem('encuestas', JSON.stringify(this.encuestas));
  }
}