import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestadorServiceService {

  private apiUrl = `${environment.apiUrl}/prestador-servicio`; // URL base para la API de prestado servicio

  constructor(public http: HttpClient) { }

  // Función para obtener todos los prestado servicio
  getAllPrestadorServicio(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllPrestadorServicio`);
  }

  // Función para obtener un PrestadorServicio por ID
  getPrestadorServicioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getPrestadorServicioById/${id}`);
  }

  // Función para agregar un nuevo PrestadorServicio
  addPrestadorServicio(prestadoservicio: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createPrestadorServicio`, prestadoservicio);
  }

  // Función para editar un PrestadorServicio existente por ID
  editPrestadorServicio(id: number, updatedPrestadorServicio: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatePrestadorServicio/${id}`, updatedPrestadorServicio);
  }

  // Función para eliminar un PrestadorServicio por ID
  deletePrestadorServicio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletePrestadorServicio/${id}`);
  }

  // Método para cambiar el estado del PrestadorServicio
  cambiarEstadoPrestadorServicio(id: number, estado: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cambiarEstadoPrestadorServicio/${id}`, { Estado: estado });
  }

}
