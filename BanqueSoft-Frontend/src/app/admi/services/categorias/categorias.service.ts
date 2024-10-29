import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = `${environment.apiUrl}/categoria`; // URL base para la API de categoria

  constructor(public http: HttpClient) { }

  // Función para obtener todos los categoria
  getAllCategoria(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllcategoria`);
  }

  // Función para obtener un categoria por ID
  getCategoriaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getcategoriaById/${id}`);
  }

  // Función para agregar un nuevo categoria
  addCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createcategoria`, categoria);
  }

  // Función para editar un categoria existente por ID
  editCategoria(id: number, updateCategoria: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatecategoria/${id}`, updateCategoria);
  }

  // Función para eliminar un categoria por ID
  deleteCategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletecategoria/${id}`);
  }

  // Método para cambiar el estado del categoria
  cambiarEstadoCategoria(id: number, estado: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cambiarEstadoCategoria/${id}`, { Estado: estado });
  }

}
