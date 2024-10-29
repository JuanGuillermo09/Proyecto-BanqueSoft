import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenajeService {

  private apiUrl = `${environment.apiUrl}/menaje`; // URL base para la API de menajes

  constructor(public http: HttpClient) { }

  // Función para obtener todos los menajes
  getAllMenaje(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllmenaje`);
  }

  // Función para obtener un menaje por ID
  getMenajeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getmenajeById/${id}`);
  }

  // Función para agregar un nuevo menaje
  addMenaje(menaje: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createmenaje`, menaje);
  }

  // Función para editar un menaje existente por ID
  editMenaje(id: number, updatedMenaje: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatemenaje/${id}`, updatedMenaje);
  }

  // Función para eliminar un menaje por ID
  deleteMenaje(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletemenaje/${id}`);
  }

  // Método para cambiar el estado del menaje
  cambiarEstadoMenaje(id: number, estado: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cambiarEstadoMenaje/${id}`, { Estado: estado });
  }


}
