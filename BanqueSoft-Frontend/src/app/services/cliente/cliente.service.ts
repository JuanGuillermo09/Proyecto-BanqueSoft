import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = `${environment.apiUrl}/cliente`; // URL base para la API de Cliente

  constructor(public http: HttpClient) { }

  // Función para obtener todos los Cliente
  getAllCliente(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllCliente`);
  }

  // Función para obtener un Cliente por ID
  getClienteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getClienteById/${id}`);
  }

  // Función para agregar un nuevo Cliente
  addCliente(Clienteervicio: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createCliente`, Clienteervicio);
  }

  // Función para editar un Cliente existente por ID
  editCliente(id: number, updatedCliente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateCliente/${id}`, updatedCliente);
  }

  // Función para eliminar un Cliente por ID
  deleteCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteCliente/${id}`);
  }

  // Método para cambiar el estado del Cliente
  cambiarEstadoCliente(id: number, estado: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cambiarEstadoCliente/${id}`, { Estado: estado });
  }
}
