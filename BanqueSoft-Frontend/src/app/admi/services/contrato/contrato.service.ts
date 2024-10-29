import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private apiUrl = `${environment.apiUrl}/contrato`; // URL base para la API de Contratos

  constructor(public http: HttpClient) { }

  // Función para obtener todos los Contratos
  getAllContrato(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllcontrato`);
  }

  // Función para obtener un Contrato por ID
  getContratoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getcontratoById/${id}`);
  }

  // Función para agregar un nuevo Contrato
  addContrato(Contrato: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createcontrato`, Contrato);
  }

  // Función para editar un Contrato existente por ID
  editContrato(id: number, updatedContrato: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatecontrato/${id}`, updatedContrato);
  }

  // Función para eliminar un Contrato por ID
  deleteContrato(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletecontrato/${id}`);
  }

  cambiarEstadoContrato(id: number, estado: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cambiarEstadoContrato/${id}`, { Estado_contrato: estado });
  }
}
