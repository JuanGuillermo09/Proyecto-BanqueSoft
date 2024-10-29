import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  private apiUrl = `${environment.apiUrl}/promocion`; // URL base para la API de promocion


  constructor(public http: HttpClient) { }

  // Función para obtener todos los promocion
  getAllPromocion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllpromocion`);
  }

  // Función para obtener un promocion por ID
  getPromocionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getpromocionById/${id}`);
  }

  // Función para agregar un nuevo promocion
  addPromocion(promo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createpromocion`, promo);
  }

  // Función para editar un promocion existente por ID
  editPromocion(id: number, updatedPromocion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatepromocion/${id}`, updatedPromocion);
  }

  // Función para eliminar un promocion por ID
  deletePromocion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletepromocion/${id}`);
  }

  // Cambiar el estado de un promocion
  cambiarEstadoPromocion(id: number, estado: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cambiarEstadoPromocion/${id}`, { Estado: estado });
  }


}
