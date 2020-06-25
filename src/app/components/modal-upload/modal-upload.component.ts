import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-Archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;

  imagenTemp: string | ArrayBuffer;

  constructor( public _subirArchivoSerivce: SubirArchivoService,
               public _uploadService: ModalUploadService) { 
    console.log('Modal listo');
  }

  ngOnInit(): void {
  }
  seleccionImagen( archivo ) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0) {
      Swal.fire(
        'Solo imagenes',
        'El archivo seleccionado no es una imagen',
        'error'
      );
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
      console.log(reader.result);
    };
  }
  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._uploadService.ocultarModal();
  }
  subirImagen(){
    this._subirArchivoSerivce.subirArchivo( this.imagenSubir, this._uploadService.tipo, this._uploadService.id)
          .then( resp => {
            this._uploadService.notificacion.emit( resp );
            this.cerrarModal();
          })
          .catch(err => {console.log('Error en carga', err);
          });

  }


}
