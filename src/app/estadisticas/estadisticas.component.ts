import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncuestaService } from '../servicios/encuesta.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-estadisticas',
  standalone: false,
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  encuesta: any;
  conteo: { [preguntaIndex: number]: { [opcion: string]: number } } = {};
  colores: { [opcion: string]: string } = {};
  coloresPastel: string[] = ['#f6c1d9', '#d7a3f3', '#c1e1ec', '#b4f0d3', '#fff3a1', '#ffc1c1'];

  @ViewChildren('grafico') graficosCanvas!: QueryList<ElementRef<HTMLCanvasElement>>;
  @ViewChildren('exportarContainer') exportarContainers!: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute,
    private encuestaService: EncuestaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.encuesta = this.encuestaService.obtenerEncuesta(id!);

    if (this.encuesta) {
      this.generarEstadisticas();
      setTimeout(() => this.dibujarGraficos(), 0); // Esperamos a que se rendericen los canvas
    }
  }

  generarEstadisticas() {
    this.conteo = {};

    this.encuesta.preguntas.forEach((pregunta: any, index: number) => {
      if (pregunta.tipo === 'abierta') return;

      this.conteo[index] = {};
      for (const r of pregunta.respuestas || []) {
        if (Array.isArray(r)) {
          for (const op of r) {
            this.conteo[index][op] = (this.conteo[index][op] || 0) + 1;
          }
        } else {
          this.conteo[index][r] = (this.conteo[index][r] || 0) + 1;
        }
      }
    });
  }

  dibujarGraficos() {
    this.encuesta.preguntas.forEach((pregunta: any, index: number) => {
      if (pregunta.tipo !== 'opcion-simple') return;

      const canvas = this.graficosCanvas.get(index)?.nativeElement;
      if (!canvas) return; // esta línea ya es suficiente
      const ctx = canvas.getContext('2d')!;


      ctx.clearRect(0, 0, 300, 300);
      const total = pregunta.respuestas.length;
      let start = 0;

      pregunta.opciones.forEach((op: string, i: number) => {
        const cantidad = this.conteo[index][op] || 0;
        const porcentaje = cantidad / total;
        const angulo = porcentaje * 2 * Math.PI;
        const color = this.coloresPastel[i % this.coloresPastel.length];
        this.colores[op] = color;

        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 100, start, start + angulo);
        ctx.fillStyle = color;
        ctx.fill();
        start += angulo;
      });
    });
  }

  exportarPDF(i: number) {
    const container = this.exportarContainers.get(i);
    if (!container) return;

    html2canvas(container.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`pregunta-${i + 1}.pdf`);
    });
  }
}

