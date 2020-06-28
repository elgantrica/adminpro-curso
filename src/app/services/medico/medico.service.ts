import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;
  token: string;
  medico: Medico = {};
  
  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService) { 
                this.token = _usuarioService.token;
               }

  cargarMedicos() {
    let url = `${URL_SERVICIOS}/medico`;
    return this.http.get(url)
            .pipe( 
              map( (resp: any) => {
                this.totalMedicos = resp.total;
                return resp.medicos;
              })
              );
  }

  crearMedico( medico: string ) {
    let url = `${URL_SERVICIOS}/medico`;
    url += `?token=${this.token}`;
    

    return this.http.post( url , medico );


  }
  buscarMedicos( termino: string ) {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url)
            .pipe( map( (resp: any) => {
              return resp.medicos;

            }));
  }
  borrarMedico( id: string) {
    let url = `${URL_SERVICIOS}/medico/${id}`;
    url += `?token=${this.token}`;

    return this.http.delete(url)
    .pipe(
      map( (resp: any) => {
        if (resp.ok) {
          Swal.fire(
            'Medico Eliminado',
            id,
            'success'
          );
        } else {
          Swal.fire(
            'Error al borrar',
            'Ha ocurrido un error al tratar de eliminar el medico',
            'error'
          );

        }
        return resp;

      })
    );

  }

  guardarMedico( medico: Medico) {
    let url = `${URL_SERVICIOS}/medico/`;

    if ( medico._id) {
      url += medico._id;
      url += `?token=${this.token}`;
      return this.http.put( url, medico)
      .pipe(
        map( (resp: any) => {
          Swal.fire('Medico Actualizado', medico.nombre, 'success');
          return resp.medico;

        })
      );


    } else {
      url += `?token=${this.token}`;
      return this.http.post( url, medico)
      .pipe(
        map( (resp: any) => {
          Swal.fire('Medico Creado', medico.nombre, 'success');
          return resp.medico;

        })
      );


    }


  }
  cargarMedico( id: string) {
    let url = `${URL_SERVICIOS}/medico/${id}`;

    return this.http.get( url)
                .pipe( 
                  map( resp => { return resp;
                                    })
                );

  }

}
