import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar.js';
import { RecetasComponent } from './receta/receta'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Navbar, RecetasComponent, RouterModule], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}