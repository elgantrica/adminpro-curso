import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];

  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital =  new Hospital( '', '', '');

  constructor( public _hospitalService: HospitalService,
               public _medicoService: MedicoService,
               public router: Router,
               public activatedRoute: ActivatedRoute,
               public _uploadService: ModalUploadService
               ) {
                 activatedRoute.params.subscribe( params => {
                   let id = params['id'];
                   if ( id !== 'nuevo') {
                     this.cargarMedico( id );

                   }
                 });
                }
  ngOnInit(): void {
    this._hospitalService.cargarHospitales().subscribe( (hospitales: any) => {
      this.hospitales = hospitales.hospitales;
    });
    this._uploadService.notificacion.subscribe( resp => {
      this.medico.img = resp.medico.img;
    }
    );
  }
  cambiarFoto() {
    this._uploadService.mostrarModal('medicos', this.medico._id);

  }
  cargarMedico( id: string) {
    this._medicoService.cargarMedico(id).subscribe( (resp: any) => {
      this.medico =  resp.medico;
      this.medico.hospital =  resp.medico.hospital._id;
      this.cambiarHospital( this.medico.hospital );
    });
  }
  cambiarHospital( id ) {
    this._hospitalService.obtenerHospital(id).subscribe( resp => {
      this.hospital = resp;
    });
  }
  guardarMedico( f: NgForm) {
    if ( f.invalid) {
      return;
    }
    this._medicoService.guardarMedico( this.medico ).subscribe( medicoGuardado => {
      console.log(medicoGuardado);
      this.medico._id = medicoGuardado._id;
      this.router.navigate(['medico', this.medico._id]);
      
    });

  }

}
