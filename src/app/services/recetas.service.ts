import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta.model';

 //Servicio encargado de la comunicación con la API REST (mock).
 
@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  // URL base del endpoint de recetas en el json-server
  private apiUrl = 'http://localhost:3000/recetas';
  constructor(private http: HttpClient) {}
  /**
   * Obtiene todas las recetas disponibles en el servidor.
   * @returns Un Observable que emite un array de Receta[].
   */
  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiUrl);
  }
  /**
   * Obtiene una receta específica por su ID.
   * @param id El identificador de la receta.
   * @returns Un Observable con los detalles de la Receta.
   */
  getReceta(id: string | number): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/${id}`);
  }
  /**
   * Actualiza una receta existente (ej: cuando se añade un voto).
   * Utiliza el verbo PUT para reemplazar el recurso.
   * @param receta El objeto receta con los datos actualizados (incluyendo nuevo rating y votos).
   */
  updateReceta(receta: Receta): Observable<Receta> {
    return this.http.put<Receta>(`${this.apiUrl}/${receta.id}`, receta);
  }
  /**
   * Crea una nueva receta en el servidor.
   * El ID es generado automáticamente por json-server.
   * @param receta Los datos de la nueva receta (sin ID).
   */
  addReceta(receta: Omit<Receta, 'id'>): Observable<Receta> {
     return this.http.post<Receta>(this.apiUrl, receta);
  }
}