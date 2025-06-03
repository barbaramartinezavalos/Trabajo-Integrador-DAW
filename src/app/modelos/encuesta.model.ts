export interface Pregunta {
  texto: string;
  tipo: 'abierta' | 'opcion-simple' | 'opcion-multiple';
  opciones: string[];
  respuestas: any[]; 
}

export interface Encuesta {
  id: string;
  preguntas: Pregunta[];
  fecha: number;
}
