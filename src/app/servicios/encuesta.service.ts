import { Injectable } from '@angular/core';

interface Encuesta {
  id: string;
  pregunta: string;
  tipo: 'abierta' | 'opcion-simple' | 'opcion-multiple';
  opciones: string[];
  respuestas: any[];
}

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  private encuestas: Encuesta[] = [];

    responderEncuesta(id: string, respuesta: any) {
    const encuesta = this.obtenerEncuesta(id);
    if (encuesta) {
      encuesta.respuestas.push(respuesta);
      this.guardar(); 
    }
  }

  crearEncuesta(encuesta: Omit<Encuesta, 'id' | 'respuestas'>): string {
  const id = crypto.randomUUID();
  this.encuestas.push({ id, ...encuesta, respuestas: [] });
  this.guardar();
  return id;
}

  obtenerEncuesta(id: string): Encuesta | undefined {
    return this.encuestas.find(e => e.id === id);
  }

  private guardar() {
  localStorage.setItem('encuestas', JSON.stringify(this.encuestas));
}

constructor() {
  const data = localStorage.getItem('encuestas');
  if (data) {
    this.encuestas = JSON.parse(data);
  }
}

}
