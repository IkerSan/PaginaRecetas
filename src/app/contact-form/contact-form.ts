import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Define la interfaz aquí también
export interface Receta {
  nombre: string;
  ingredientes: string[];
  imagen: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss'] 
})
export class ContactForm {
  //Emitimos el evento para añadir receta
  @Output() recetaAgregada = new EventEmitter<Receta>();

  contactForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    ingredientes: new FormControl('', Validators.required)
  });


  imagenSeleccionada: File | null = null;
  imagenPreview: string | ArrayBuffer | null = null;

  get nombre() {
    return this.contactForm.get('nombre');
  }
  
  get ingredientes() {
    return this.contactForm.get('ingredientes');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0];
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result;
      };
      reader.readAsDataURL(this.imagenSeleccionada);
    } else {
      this.imagenSeleccionada = null;
      this.imagenPreview = null;
    }
  }

  sendMessage() {
  
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }

    const nombreReceta = this.nombre?.value || '';
    const listaIngredientes = this.ingredientes?.value || '';
    
    //Separar los ingredientes por comas
    const ingredientesArray = listaIngredientes
      .split(',')
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0);

    const nuevaReceta: Receta = {
      nombre: nombreReceta,
      ingredientes: ingredientesArray,
      imagen: this.imagenPreview || 'assets/placeholder.jpg'
    };

    this.recetaAgregada.emit(nuevaReceta);
    
    //Informar de que se ha enviado la receta
    alert(
      'Receta enviada:\n' +
      'Nombre: ' + nombreReceta + '\n' +
      'Ingredientes: ' + ingredientesArray.join(', ')
    );

    this.contactForm.reset();
    this.imagenSeleccionada = null;
    this.imagenPreview = null;
    
    const fileInput = document.getElementById('imagen') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}