import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactForm } from '../contact-form/contact-form';

export interface Receta {
  nombre: string;
  ingredientes: string[];
  imagen: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule, ContactForm],
  templateUrl: './receta.html',
  styleUrls: ['./receta.scss']
})
export class RecetasComponent {

  //Ponemos las recetas default
  recetas: Receta[] = [
    {
      nombre: 'Tortilla de patata',
      ingredientes: ['Patatas', 'Huevos', 'Cebolla', 'Aceite', 'Sal'],
      imagen: 'tortilla-de-patatas-1.jpg'
    },
    {
      nombre: 'Flan',
      ingredientes: ['Huevos', 'Azúcar', 'Leche', 'Vainilla', 'Caramelo líquido'],
      imagen: 'flan.jpeg'
    },
    {
      nombre: 'Macarrones',
      ingredientes: ['Macarrones', 'Salsa de tomate', 'Carne picada', 'Cebolla', 'Queso rallado'],
      imagen: 'macarrones.jpeg'
    },
    {
      nombre: 'Bocata Lomo',
      ingredientes: ['Pan', 'Lomo', 'Jamón', 'Queso', 'Tomate'],
      imagen: 'bocadillo-de-lomo-con-jamon.jpg'
    }
  ];

  agregarReceta(nuevaReceta: Receta) {
    //Añadimos una nueva receta en la lista
    this.recetas = [...this.recetas, nuevaReceta];
    
  }

}