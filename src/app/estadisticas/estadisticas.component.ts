import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  conteo: { [opcion: string]: number } = {};
  colores: { [opcion: string]: string } = {};

  @ViewChild('grafico', { static: false }) graficoCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('exportarContainer', { static: false }) exportarContainer?: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private encuestaService: EncuestaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.encuesta = this.encuestaService.obtenerEncuesta(id!);
    if (this.encuesta) {
      this.generarEstadisticas();
      setTimeout(() => this.dibujarGrafico(), 0);
    }
  }

  generarEstadisticas() {
    this.conteo = {};
    if (this.encuesta.tipo === 'abierta') return;

    for (const r of this.encuesta.respuestas) {
      if (Array.isArray(r)) {
        for (const op of r) {
          this.conteo[op] = (this.conteo[op] || 0) + 1;
        }
      } else {
        this.conteo[r] = (this.conteo[r] || 0) + 1;
      }
    }
  }

  dibujarGrafico() {
    if (!this.graficoCanvas || !this.encuesta || this.encuesta.tipo !== 'opcion-simple') return;

    const ctx = this.graficoCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 300, 300);

    const total = this.encuesta.respuestas.length;
    const opciones = this.encuesta.opciones;
    const coloresPastel = ['#f6c1d9', '#d7a3f3', '#c1e1ec', '#b4f0d3', '#fff3a1', '#ffc1c1'];

    let start = 0;
    opciones.forEach((op: string, index: number) => {
      const cantidad = this.conteo[op] || 0;
      const porcentaje = cantidad / total;
      const angulo = porcentaje * 2 * Math.PI;

      const color = coloresPastel[index % coloresPastel.length];
      this.colores[op] = color;

      ctx.beginPath();
      ctx.moveTo(150, 150);
      ctx.arc(150, 150, 100, start, start + angulo);
      ctx.fillStyle = color;
      ctx.fill();
      start += angulo;
    });
  }

  exportarPDF() {
    const element = this.exportarContainer?.nativeElement;
    if (!element) return;

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('estadisticas.pdf');
    });
  }
}
