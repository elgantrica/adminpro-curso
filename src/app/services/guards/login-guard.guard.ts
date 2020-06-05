import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {


  constructor( public _usuarioService: UsuarioService,
               public router: Router ) {
    
  }

  canActivate() {
    if ( this._usuarioService.estaLogueado()) {
      console.log('PASO EL GUARD');
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('BLOQUEADO POR GUARD');
      return false;
      
    }
  }
  
}
