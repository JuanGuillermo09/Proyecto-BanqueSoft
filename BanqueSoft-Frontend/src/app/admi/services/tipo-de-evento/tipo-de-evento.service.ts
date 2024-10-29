import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDeEventoService {

  private apiUrl = `${environment.apiUrl}/tipo-de-evento`; // URL base para la API de TipoDeEvento

  constructor(public http: HttpClient) { }

  // Función para obtener todos los TipoDeEvento
  getAllTipoDeEvento(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllTipoDeEvento`);
  }

  // Función para obtener un TipoDeEvento por ID
  getTipoDeEventoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getTipoDeEventoById/${id}`);
  }

  // Función para agregar un nuevo TipoDeEvento
  addTipoDeEvento(TipoEvent: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createTipoDeEvento`, TipoEvent);
  }

  // Función para editar un TipoDeEvento existente por ID
  editTipoDeEvento(id: number, updatedTipoDeEvento: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateTipoDeEvento/${id}`, updatedTipoDeEvento);
  }

  // Función para eliminar un TipoDeEvento por ID
  deleteTipoDeEvento(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteTipoDeEvento/${id}`);
  }

  // Cambiar el estado de un TipoDeEvento
  cambiarEstadoTipoDeEvento(id: number, estado: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cambiarEstadoTipoDeEvento/${id}`, { Estado: estado });
  }

}
