import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private apiUrl = `${environment.apiUrl}/administrador`; // URL base para la API de Administrador

  constructor(public http: HttpClient) { }

  // Función para obtener todos los Administrador
  getAllAdministrador(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllAdministrador`);
  }

  // Función para obtener un Administrador por ID
  getAdministradorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAdministradorById/${id}`);
  }

  // Función para agregar un nuevo Administrador
  addAdministrador(administradorervicio: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createAdministrador`, administradorervicio);
  }

  // Función para editar un Administrador existente por ID
  editAdministrador(id: number, updatedAdministrador: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateAdministrador/${id}`, updatedAdministrador);
  }

  // Función para eliminar un Administrador por ID
  deleteAdministrador(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteAdministrador/${id}`);
  }

  // Método para cambiar el estado del Administrador
  cambiarEstadoAdministrador(id: number, estado: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cambiarEstadoAdministrador/${id}`, { Estado: estado });
  }

}
