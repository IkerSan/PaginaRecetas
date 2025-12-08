import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RecetasService } from '../../services/recetas.service';
import { Receta } from '../../models/receta.model';

@Component({
  selector: 'app-receta-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './receta-detail.html' 
})
export class RecetaDetailComponent implements OnInit {
  receta: Receta | null = null;
  protected readonly Math = Math;

  constructor(
    private route: ActivatedRoute, // Para leer parámetros de la URL
    private recetasService: RecetasService
  ) {}

  //Lee el parámetro id de la URL y carga la receta correspondiente.

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Convertimos a Number
      const idParam = params.get('id');
      
      if (idParam) {
        // Intentamos cargar la receta. Si el servicio espera string | number, pasamos el valor.
        this.cargarReceta(idParam);
      }
    });
  }

  cargarReceta(id: string | number) {
    this.recetasService.getReceta(id).subscribe(data => {
      this.receta = data;
    });
  }

  //Realiza el voto de la receta, actualiza el rating y votos
  votar(valor: number) {
    if (!this.receta) return;

    const nuevoVotos = this.receta.votes + 1;
    const nuevoRating = ((this.receta.rating * this.receta.votes) + valor) / nuevoVotos;

    const recetaActualizada: Receta = {
      ...this.receta,
      votes: nuevoVotos,
      rating: parseFloat(nuevoRating.toFixed(1))
    };

    // Actualizamos en backend y refrescamos el objeto
    this.recetasService.updateReceta(recetaActualizada).subscribe(r => {
      this.receta = r;
    });
  }
}
