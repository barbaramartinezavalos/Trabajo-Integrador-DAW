import { Injectable } from '@angular/core';

interface Encuesta {
  id: string;
  pregunta: string;
  tipo: 'abierta' | 'opcion-simple' | 'opcion-multiple';
  opciones: string[];
}

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private encuestas: Encuesta[] = [];

  crearEncuesta(encuesta: Omit<Encuesta, 'id'>): string {
    const id = crypto.randomUUID();
    this.encuestas.push({ id, ...encuesta });
    return id;
  }

  obtenerEncuesta(id: string): Encuesta | undefined {
    return this.encuestas.find(e => e.id === id);
  }
}
