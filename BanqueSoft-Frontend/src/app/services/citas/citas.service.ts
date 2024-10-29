import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiUrl = `${environment.apiUrl}/cita`; // URL base para la API de cita


  constructor(public http: HttpClient) { }

  // Función para obtener todos los Cita
  getAllCita(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllCita`);
  }

  // Función para obtener un Cita por ID
  getCitaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getCitaById/${id}`);
  }

  // Función para agregar un nuevo Cita
  addCita(cit: any): Observable<any> {
    // Obtén el Cod_cliente desde el localStorage
    const clientId = localStorage.getItem('clientId');

    // Asegúrate de agregar el Cod_cliente al objeto citaData
    const citaConCliente = {
      ...cit,
      Cod_cliente: clientId // Agrega el ID del cliente al objeto
    };
    return this.http.post<any>(`${this.apiUrl}/createCita`, citaConCliente);
  }

  // Función para editar un Cita existente por ID
  editCita(id: number, updatedCita: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateCita/${id}`, updatedCita);
  }

  // Función para eliminar un Cita por ID
  deleteCita(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteCita/${id}`);
  }

  // Cambiar el estado de un Cita
  cambiarEstadoCita(id: number, estado: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cambiarEstadoCita/${id}`, { Estado: estado });
  }


}
