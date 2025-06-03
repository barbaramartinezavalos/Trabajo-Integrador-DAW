import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncuestaService } from '../servicios/encuesta.service';

@Component({
  selector: 'app-responder',
  standalone: false,
  templateUrl: './responder.component.html',
  styleUrl: './responder.component.scss'
})
export class ResponderComponent implements OnInit {
  encuesta: any;
  respuestas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private encuestaService: EncuestaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.encuesta = this.encuestaService.obtenerEncuesta(id);
      this.respuestas = new Array(this.encuesta?.preguntas?.length || 0).fill('');
    }
  }

  onCheckChange(event: any, index: number) {
    if (!Array.isArray(this.respuestas[index])) {
      this.respuestas[index] = [];
    }

    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      this.respuestas[index].push(value);
    } else {
      this.respuestas[index] = this.respuestas[index].filter((v: any) => v !== value);
    }
  }

  enviarRespuesta() {
    if (!this.encuesta?.id) {
      alert('Encuesta no válida');
      return;
    }

    this.encuestaService.responderEncuesta(this.encuesta.id, this.respuestas);
    alert('¡Respuestas enviadas con éxito!');
    this.respuestas = [];
  }
}

