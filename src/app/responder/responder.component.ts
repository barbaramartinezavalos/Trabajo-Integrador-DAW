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
  respuesta: any = '';

  constructor(
    private route: ActivatedRoute,
    private encuestaService: EncuestaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.encuesta = this.encuestaService.obtenerEncuesta(id);
    }
  }

  enviarRespuesta() {
    if (!this.encuesta?.id) {
      alert('Encuesta no válida');
      return;
    }

    this.encuestaService.responderEncuesta(this.encuesta.id, this.respuesta);
    console.log('Respuesta enviada:', this.respuesta);
    alert('¡Respuesta registrada!');
    this.respuesta = '';
  }

  onCheckChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!Array.isArray(this.respuesta)) {
      this.respuesta = [];
    }

    if (input.checked) {
      this.respuesta.push(value);
    } else {
      this.respuesta = this.respuesta.filter((v: any) => v !== value);
    }
  }
}
