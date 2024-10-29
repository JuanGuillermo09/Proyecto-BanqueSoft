import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private apiUrl = `${environment.apiUrl}/proveedor`; // URL base para la API de proveedores

  constructor(public http: HttpClient) { }

  // Función para obtener todos los proveedores
  getAllProveedores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllproveedor`);
  }

  // Función para obtener un proveedor por ID
  getProveedorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getproveedorById/${id}`);
  }

  // Función para agregar un nuevo proveedor
  addProveedor(prove: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createproveedor`, prove);
  }

  // Función para editar un proveedor existente por ID
  editProveedor(id: number, updatedProveedor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateproveedor/${id}`, updatedProveedor);
  }

  // Función para eliminar un proveedor por ID
  deleteProveedor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteproveedor/${id}`);
  }

  // Cambiar el estado de un proveedor
  cambiarEstadoProveedor(id: number, estado: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cambiarEstadoProveedor/${id}`, { Estado: estado });
  }


}
