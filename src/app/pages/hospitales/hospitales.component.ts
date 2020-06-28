import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  cargando: boolean = false;
  hospitales: Hospital[] = [];
  totalHospitales: number = 0;

  constructor( public _hospitalService: HospitalService,
               public _uploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
   
    this._uploadService.notificacion.subscribe( resp => {
      this.cargarHospitales();
      console.log(resp);
      
    });
  }
  cargarHospitales(){
    this._hospitalService.cargarHospitales().subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
      this.totalHospitales = resp.total;
      console.log(resp);
    });



  }
  async crearHospital(){
    let hospital: any = null;

    hospital = await Swal.fire({
      title: 'Ingrese nombre hospital',
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre del hospital'
    });

    
    if (hospital) {
    
      console.log('prueba', hospital);
      this._hospitalService.crearHospital( hospital.value ).subscribe( resp => {
        console.log('Hospital nuevo', resp);
        Swal.fire(`Se ha agregado el nuevo hospital: ${hospital.value}`);
        this.cargarHospitales();

        
      });

    }
    
  }
  mostrarModal( id: string ) {
    this._uploadService.mostrarModal( 'hospitales', id);

  }
  borrarHospital( hospital: Hospital) {

    Swal.fire({
      title: 'Esta seguro?',
      text: `Desea eliminar al hospital: ${hospital.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {

      if (result.value) {
        let eliminado: boolean = false;
        this._hospitalService.borrarHospital( hospital._id ).subscribe( resp => {
          eliminado = resp;
          console.log('Eliminado bien', eliminado );
          this.cargarHospitales();
          // this.cargarUsuarios();
          
        });
      }
    });

  }
  guardarHospital( hospital: Hospital) {

    this._hospitalService.actualizarHospital( hospital )
            .subscribe( resp => {
              console.log('nombre de hospital actualizado', resp);
              
            });
  }


  buscarHospital( termino: string){
    if (termino.trim().length > 0) {
      this._hospitalService.buscarHospital(termino).subscribe( resp => {
        this.hospitales = resp;
      });

    }

  }


}
