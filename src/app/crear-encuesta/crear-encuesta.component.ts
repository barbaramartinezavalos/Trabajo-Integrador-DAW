import { Component } from '@angular/core';
import { EncuestaService } from '../servicios/encuesta.service';
import { Router } from '@angular/router';

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
  idGenerado: string = ''; 

  constructor(
    private encuestaService: EncuestaService,
    private router: Router
  ) {}

  agregarOpcion() {
    this.opciones.push('');
  }

  eliminarOpcion(index: number) {
    this.opciones.splice(index, 1);
  }

  crearEncuesta() {
    const encuesta = {
      pregunta: this.pregunta,
      tipo: this.tipo,
      opciones: this.tipo === 'abierta' ? [] : this.opciones
    };

    const id = this.encuestaService.crearEncuesta(encuesta);
    this.idGenerado = id;
  }

  copiarAlPortapapeles(texto: string) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('¡Enlace copiado al portapapeles! 📋');
    });
  }
}