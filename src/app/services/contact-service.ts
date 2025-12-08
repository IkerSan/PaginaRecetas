import { Injectable } from '@angular/core';
import {ContactModel } from '../models/ContactModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
 contactosRealizados: ContactModel[] = [new ContactModel("miguel_goyena@cuatrovientos.org", "Hello Miguel!!")];
 anadirContacto(contacto: ContactModel){
 this.contactosRealizados.push(contacto);
 }
 listarContactos(): ContactModel[]{
 return this.contactosRealizados;
 }
}
