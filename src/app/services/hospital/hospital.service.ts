import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital: Hospital = null;
  token: string;

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService ) {
                 this.token = _usuarioService.token;
                }

  cargarHospitales() {
    let url = `${URL_SERVICIOS}/hospital`;
    return this.http.get(url);

  }


  obtenerHospital( id: string) {
    let url = `${URL_SERVICIOS}/hospital/${id}`;
    return this.http.get(url)
            .pipe(
              map( (resp: any) => resp.hospital));

  }
  crearHospital( nombre: string ) {
    let url = `${URL_SERVICIOS}/hospital`;
    url += `?token=${this.token}`;
    this.hospital = { nombre };

    
    return this.http.post(url, this.hospital);

  }
  buscarHospital( termino: string ) {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url)
            .pipe( map( (resp: any) => {
              return resp.hospitales;

            }));
  }
  actualizarHospital( hospital: Hospital) {
    let url = `${URL_SERVICIOS}/hospital/${hospital._id}`;
    url += `?token=${this.token}`;
    return this.http.put(url, hospital)
            .pipe(
              map( (resp: any) => {
                // if ( hospital._id === this.hospital._id ) {
                //   let hospitalDB: Hospital = resp.usuario;
                // }

                Swal.fire(
                  'Hospital Actualizado',
                  hospital.nombre,
                  'success'
                );
                return true;
              }

              )
            );

  }

  borrarHospital( id: string) {
    let url = `${URL_SERVICIOS}/hospital/${id}`;
    url += `?token=${this.token}`;
    return this.http.delete(url)
                .pipe(
                  map( (resp: any) => {
                    if (resp.ok) {
                      Swal.fire(
                        'Hospital Eliminado',
                        id,
                        'success'
                      );
                    } else {
                      Swal.fire(
                        'Error al borrar',
                        'Ha ocurrido un error al tratar de eliminar el hospital',
                        'error'
                      );

                    }
                    return resp;

                  })
                );
  }
}
