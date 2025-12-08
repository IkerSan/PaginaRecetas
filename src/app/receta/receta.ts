import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactForm } from '../contact-form/contact-form';
import { RecetasService } from '../services/recetas.service';
import { Receta } from '../models/receta.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule, ContactForm, FormsModule, RouterModule],
  templateUrl: './receta.html',
  styleUrls: ['./receta.scss']
})
export class RecetasComponent implements OnInit {

  recetas: Receta[] = []; // Lista completa de recetas obtenida del servidor
  recetasFiltradas: Receta[] = []; // Lista que se muestra en pantalla (filtrada)
  minRating: number = 0; // Valor del filtro seleccionado (por defecto 0)
  protected readonly Math = Math; // Hacemos accesible Math al template para redondear

  constructor(private recetasService: RecetasService) {}

  /**
   * Al inicializar el componente, cargamos las recetas.
   */
  ngOnInit() {
    this.cargarRecetas();
  }

  /**
   * Se suscribe al servicio para obtener la lista de recetas.
   * Al recibirlas, actualiza la lista local y aplica el filtro inicial.
   */
  cargarRecetas() {
    this.recetasService.getRecetas().subscribe(data => {
      this.recetas = data;
      this.filtrarRecetas();
    });
  }

  /**
   * Método llamado cuando el componente hijo (form) emite una nueva receta.
   * Crea el objeto con valores iniciales y lo envía al servicio.
   */
  agregarReceta(evento: any) {
     const nuevaReceta: Omit<Receta, 'id'> = {
      nombre: evento.nombre,
      ingredientes: evento.ingredientes,
      imagen: evento.imagen as string, 
      rating: 0, // Nueva receta empieza sin valoración
      votes: 0
    };

    // Añadir al servidor y luego refrescar la lista local
    this.recetasService.addReceta(nuevaReceta).subscribe(recetaGuardada => {
      this.recetas.push(recetaGuardada);
      this.filtrarRecetas();
    });
  }

  /**
   * Gestiona el voto del usuario.
   * Calcula el nuevo promedio ponderado basado en los votos anteriores.
   * @param receta La receta que se está votando
   * @param valor La puntuación (1-5)
   */
  votar(receta: Receta, valor: number) {
    const nuevoVotos = receta.votes + 1;
    // Fórmula de promedio acumulativo: (RatingActual * VotosTotales + NuevoVoto) / NuevosVotosTotales
    const nuevoRating = ((receta.rating * receta.votes) + valor) / nuevoVotos;

    const recetaActualizada: Receta = {
      ...receta,
      votes: nuevoVotos,
      rating: parseFloat(nuevoRating.toFixed(1)) // Redondeamos a 1 decimal
    };

    // Actualizamos en servidor
    this.recetasService.updateReceta(recetaActualizada).subscribe(r => {
      // Al confirmar éxito, actualizamos la vista localmente
      const index = this.recetas.findIndex(item => item.id === r.id);
      if (index !== -1) {
        this.recetas[index] = r;
        this.filtrarRecetas();
      }
    });
  }
  
  /**
   * Filtra la lista de recetas según el rating mínimo seleccionado.
   */
  filtrarRecetas() {
      if (this.minRating > 0) {
          this.recetasFiltradas = this.recetas.filter(r => r.rating >= this.minRating);
      } else {
          this.recetasFiltradas = this.recetas;
      }
  }
}