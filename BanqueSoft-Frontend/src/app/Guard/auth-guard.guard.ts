import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); // Asegúrate de guardar el rol al iniciar sesión
  const recoveryToken = route.params['token']; // Obtener el token de la URL

  // Si la ruta es cambiar-contrasenia/:token, verificar el token de recuperación
  if (route.routeConfig?.path === 'cambiar-contrasenia/:token') {
    if (!isValidRecoveryToken(recoveryToken)) {
      // Si el token no es válido, redirigir a la página de inicio de sesión
      router.navigate(['/iniciarSesion']);
      return false; // Denegar acceso
    }
    return true; // Permitir acceso a la ruta de cambio de contraseña si el token es válido
  }

  // Si no hay token, redirigir a la página de inicio de sesión
  if (!token) {
    router.navigate(['/iniciarSesion']);
    return false; // Denegar acceso
  }

  // Si hay token, verificar el rol del usuario
  const currentPath = route.routeConfig?.path; // Obtiene la ruta activa

  // Manejar redirecciones según el rol del usuario
  if (currentPath) {
    if (currentPath === 'iniciarSesion') {
      if (userRole === 'Administrador') {
        router.navigate(['/admi/inicio']); // Ruta para el administrador
        return false; // Denegar acceso a la página de inicio de sesión
      } else if (userRole === 'Cliente') {
        router.navigate(['/cita']); // Ruta para el cliente
        return false; // Denegar acceso a la página de inicio de sesión
      }
    }

    // Proteger rutas de administrador
    if (currentPath.startsWith('admi') && userRole !== 'Administrador') {
      router.navigate(['/cita']); // Redirigir a la página del cliente
      return false; // Denegar acceso a rutas de administrador
    }
  }

  // Permitir acceso a rutas permitidas
  return true;
};

// Implementación de la función isValidRecoveryToken
function isValidRecoveryToken(recoveryToken: string): boolean {
  // Aquí debes implementar la lógica para validar el token de recuperación.
  // Por ejemplo, puedes verificar que el token tenga un formato correcto o llamarlo a la API para validar su estado.

  // Ejemplo simple de validación:
  return !!recoveryToken && recoveryToken.length > 10; // Cambia esta lógica según tus necesidades
};
