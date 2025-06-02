import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  encuestas: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const guardadas = localStorage.getItem('encuestas');
    if (guardadas) {
      this.encuestas = JSON.parse(guardadas).sort((a: any, b: any) => b.fecha - a.fecha);
    }
  }

  responder(id: string) {
    this.router.navigate(['/responder', id]);
  }

  estadisticas(id: string) {
    this.router.navigate(['/estadisticas', id]);
  }

  filtro: string = '';

encuestasFiltradas() {
  return this.encuestas.filter(e =>
    e.pregunta.toLowerCase().includes(this.filtro.toLowerCase())
  );
}

}
