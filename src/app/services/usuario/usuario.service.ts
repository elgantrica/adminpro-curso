import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-Archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
               public router: Router,
               public _subirArchivoService: SubirArchivoService) { 
    this.cargaStorage();    
  }
  estaLogueado(){
    return ( this.token.length > 5) ? true : false;
  }
  cargaStorage(){
    if( localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;

    }

  }
  guardarStorage( id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }
  logout(){
    this.usuario = null;
    this.token = '';
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
  loginGoogle( token: string ){
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token })
                .pipe(
                  map((resp: any) => {
                    this.guardarStorage(resp.id, resp.token, resp.usuario);
                    return true;
                  })
                );
  }
  login( usuario: Usuario, recordar: boolean = false){
    if ( recordar){
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = `${URL_SERVICIOS}/login`;

    return this.http.post( url, usuario)
      .pipe( map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));


  }
  cargarUsuarios( desde: number = 0){
    let url = `${URL_SERVICIOS}/usuario?desde=${desde}`;
    return this.http.get(url);

  }
  buscarUsuarios( termino: string){
    let url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;
    return this.http.get(url)
            .pipe( map( (resp: any) => {
              return resp.usuarios;

            }));

  }

  crearUsuario( usuario: Usuario) {

    let url = `${URL_SERVICIOS}/usuario`;

    return this.http.post(url, usuario)
            .pipe (
              map( (resp: any) => {
                Swal.fire(
                  'Usuario Creado',
                  usuario.email,
                  'success'
                );
                return resp.usuario;
            })
            );


  }
  borrarUsuario( usuario: Usuario) {
    let url = `${URL_SERVICIOS}/usuario/${usuario._id}`;
    url += `?token=${this.token}`;
    return this.http.delete(url)
            .pipe(
              map( resp => {
                Swal.fire(
                  'Usuario Borrado',
                  usuario.email,
                  'success'
                );
                return true;
              })
            );
  }
  actualizarUsuario( usuario: Usuario) {
    let url = `${URL_SERVICIOS}/usuario/${usuario._id}`;
    url += `?token=${this.token}`;
    return this.http.put(url, usuario)
            .pipe(
              map( (resp: any) => {
                if ( usuario._id === this.usuario._id ) {
                  let usuarioDB: Usuario = resp.usuario;
                  this.guardarStorage( usuarioDB._id, this.token, usuarioDB);
                }

                Swal.fire(
                  'Usuario Actualizado',
                  usuario.email,
                  'success'
                );
                return true;
              }

              )
            );

  }
  cambiarImagen( file: File, id: string) {

    this._subirArchivoService.subirArchivo( file , 'usuarios', id )
          .then( (resp: any) => {
            this.usuario.img = resp.usuario.img;
            Swal.fire(
              'Imagen Actualizada',
              this.usuario.nombre,
              'success'
            );
            this.guardarStorage( id , this.token, this.usuario);
            console.log(resp);
          })
          .catch( err => {
            console.log(err);
          });
  }
}
