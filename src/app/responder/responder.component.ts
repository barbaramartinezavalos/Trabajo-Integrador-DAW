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
    console.log('Respuesta enviada:', this.respuesta);
    alert('Respuesta registrada (solo en consola)');
  }
  onCheckChange(event: any) {
  if (!Array.isArray(this.respuesta)) {
    this.respuesta = [];
  }

  const value = event.target.value;
  if (event.target.checked) {
    this.respuesta.push(value);
  } else {
    this.respuesta = this.respuesta.filter((v: any) => v !== value);
  }
}

}
