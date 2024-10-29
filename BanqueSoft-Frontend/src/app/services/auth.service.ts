import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`; // URL base para la API de

  constructor(private http: HttpClient, private router: Router) {}

  loginCliente(identificacion: string, contrasenia: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cliente/loginCliente`, { Identificacion: identificacion, Contrasenia: contrasenia })
    .pipe(tap((response: any) => {
        localStorage.setItem('token', response.token); // Guardar el token en localStorage
        localStorage.setItem('userRole', 'Cliente'); // Guardar el rol como Cliente
        localStorage.setItem('clientName', response.clientName); // Guardar el nombre del cliente
        localStorage.setItem('clientId', response.clientId); // Guardar el Cod_cliente del cliente
        console.log('Nombre del cliente guardado:', response.clientName, 'Id de cliente guardado', response.Cod_cliente); // Verifica que el nombre sea el correcto
    }));
  }

  loginAdministrador(identificacion: string, contrasenia: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/administrador/loginAdministrador`, { Identificacion: identificacion, Contrasenia: contrasenia })
      .pipe(tap((response: any) => {
        localStorage.setItem('token', response.token); // Guardar el token
        localStorage.setItem('userRole', 'Administrador'); // Guardar el rol como Administrador
        localStorage.setItem('adminName', response.adminName); // Asegúrate de que el campo se llama 'Nombre' en la respuesta
        localStorage.setItem('adminId', response.adminId); // Guardar el Cod_administrador del Administrador
        console.log('Nombre del administrador guardado:', response.Nombre); // Agrega esta línea
      }));
  }

logout() {
  localStorage.removeItem('token'); // Elimina el token del localStorage
  localStorage.removeItem('userRole'); // Eliminar el rol
  localStorage.removeItem('clientName'); // Eliminar el nombre del Cliente
  localStorage.removeItem('adminName'); // Eliminar el nombre del administrador
  localStorage.removeItem('clientId'); // Eliminar el ID del clientId
  this.router.navigate(['/iniciarSesion']); // Redirige a la página de inicio de sesión
}



  // Función para solicitar la recuperación de contraseña
  enviarCorreoRecuperacion(tipoDocumento: string, identificacion: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar-contrasenia`, {
      Tipo_documento: tipoDocumento,
      Identificacion: identificacion,
    });
  }


// Método para cambiar la contraseña
cambiarContrasenia(token: string, newPassword: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/cambiar-contrasenia`, {
    token: token,
    newPassword: newPassword // Asegúrate de que sea 'newPassword' y no 'NewPassword'
  });
}

}

