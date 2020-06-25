import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _usuarioService: UsuarioService ,
               public _uploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this._uploadService.notificacion.subscribe( resp => {
      this.cargarUsuarios();

    });
  }
  mostrarModal( id: string ) {
    this._uploadService.mostrarModal( 'usuarios', id);

  }
  cambiarDesde(  valor: number){

    let desde = this.desde + valor;

    console.log(desde);
    if ( desde >= this.totalRegistros) {
      return;

    }
    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();

  }
  buscarUsuario( termino: string) {
    if ( termino.trim().length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this._usuarioService.buscarUsuarios(termino).subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }
  borrarUsuario( usuario: Usuario) {
    if ( usuario._id === this._usuarioService.usuario._id) {
      Swal.fire({
        icon: 'error',
        title: 'Error al intentar borrar',
        text: 'No se puede borrar a usted mismo'
      });
      return;
    }
    Swal.fire({
      title: 'Esta seguro?',
      text: `Desea eliminar al usuario ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {

      if (result.value) {
        let eliminado: boolean = false;
        this._usuarioService.borrarUsuario( usuario ).subscribe( resp => {
          eliminado = resp;
          console.log('Eliminado bien', eliminado );
          this.cargarUsuarios();
          
        });
      }
    });



    console.log(usuario);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
          .subscribe( (resp: any) => {
            this.totalRegistros = resp.total;
            this.usuarios = resp.usuarios;
            this.cargando = false;
          });


  }
  guardarUsuario( usuario: Usuario) {

this._usuarioService.actualizarUsuario( usuario )
        .subscribe( resp => {
          console.log('rol actualizado', resp);
          
        });
  }

}
