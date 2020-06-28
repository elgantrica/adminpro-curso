import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/service.index';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor( public _medicosService: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  buscarMedico( termino: string ) {

    if ( termino.trim().length > 0) {
      this._medicosService.buscarMedicos( termino ).subscribe( medicos => this.medicos = medicos);


    }
  }



  cargarMedicos() {
    this._medicosService.cargarMedicos().subscribe( medicos => this.medicos = medicos);

  }

  async crearMedico() {
    let medico: any = null;

    medico = await Swal.fire({
      title: 'Ingrese nombre medico',
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre del medico'
    });


    if (medico) {

      console.log('prueba', medico);
      this._medicosService.crearMedico( medico.value ).subscribe( resp => {
        console.log('Medico nuevo', resp);
        Swal.fire(`Se ha agregado el nuevo hospital: ${medico.value}`);
        this.cargarMedicos();
      });

    }
  }
  editarMedico( medico: Medico) {

  }
  borrarMedico( medico: Medico) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Desea eliminar al medico ${medico.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {

      if (result.value) {
        let eliminado: boolean = false;
        this._medicosService.borrarMedico( medico._id ).subscribe( resp => {
          eliminado = resp;
          console.log('Eliminado bien', eliminado );
          this.cargarMedicos();
        });
      }
    });
  }
}
