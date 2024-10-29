import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = `${environment.apiUrl}/servicio`; // URL base para la API de Servicio


  constructor(public http: HttpClient) { }

  // Función para obtener todos los Servicio
  getAllServicio(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllServicio`);
  }

  // Función para obtener un proveedor por ID
  getServicioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getServicioById/${id}`);
  }

  // Función para agregar un nuevo proveedor
  addServicio(servi: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createServicio`, servi);
  }

  // Función para editar un proveedor existente por ID
  editServicio(id: number, updatedServicio: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateServicio/${id}`, updatedServicio);
  }

  // Función para eliminar un proveedor por ID
  deleteServicio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteServicio/${id}`);
  }

  // Cambiar el estado de un proveedor
  cambiarEstadoServicio(id: number, estado: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cambiarEstadoServicio/${id}`, { Estado: estado });
  }

}
