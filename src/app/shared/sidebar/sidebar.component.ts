import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;

  constructor( public _sb: SidebarService,
               public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
    this._sb.cargarMenu();
  }

}
