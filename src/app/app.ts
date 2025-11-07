import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar.js';
import { RecetasComponent } from './receta/receta'; // ⬅️ Importa RecetasComponent

@Component({
  selector: 'app-root',
  imports: [Navbar, RecetasComponent], // ⬅️ Usa RecetasComponent en vez de ContactForm
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Vacío, toda la lógica está en RecetasComponent
}