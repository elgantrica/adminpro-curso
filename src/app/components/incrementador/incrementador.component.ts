import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress:ElementRef;
  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { 
    console.log('Leyenda', this.leyenda);
    console.log('Progreso', this.leyenda);
  }

  ngOnInit(): void {
  }
  cambia( nuevoValor: number ){
    // console.log('nuevoValor', nuevoValor);
    // console.log( event );

    // let elemtHTML: any = document.getElementsByName('progreso')[0];
    // console.log(elemtHTML.value);

    if ( nuevoValor  >= 100) {
      this.progreso = 100;
    } else if ( nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    // elemtHTML.value =  this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );
  }
  cambiarValor( valor: number){

    if ( this.progreso >= 100 && valor > 0){
      this.progreso = 100;
      return;

    }
    if ( this.progreso <= 0 && valor < 0){
      this.progreso = 0;
      return;

    }
    this.progreso = this.progreso + valor;
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();


  }

}
