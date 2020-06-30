import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor( public activatedRoute: ActivatedRoute,
               public http: HttpClient) {
                 activatedRoute.params.subscribe( params => {
                   let terminoBuscar = params['termino'];

                   this.busquedaTodo( terminoBuscar ).subscribe( (resp: any) => {
                     this.usuarios = resp.usuarios;
                     this.hospitales = resp.hospitales;
                     this.medicos = resp.medicos;
                   });

                 });

               }

  ngOnInit(): void {
  }

  busquedaTodo( termino: string) {

    let url = `${URL_SERVICIOS}/busqueda/todo/${termino}`;

    return this.http.get( url );

  }

}
