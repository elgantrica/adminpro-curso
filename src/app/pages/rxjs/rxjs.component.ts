import { Component, OnInit, OnDestroy } from '@angular/core';
import { retry , map, filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
   
    this.subscription = this.regresaObservable()
        .subscribe( numero => { 
      console.log('Subs:', numero); },
      error => console.error('error en el obs', error),
      () => console.log('El observador termino')
    );
   }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
    
  }

  regresaObservable(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;

      const intervalo = setInterval( () => {
        contador += 1;
        const salida = {
          valor: contador
        };
        observer.next( salida );
        // if( contador === 3)
        // {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if( contador === 2) { 
        //  // clearInterval(intervalo);
        //   observer.error('Fatal error');
        // }

      

      }, 1000);
    }).pipe( 
        map( (resp:any) => resp.valor ),
        filter( ( valor, index) => {
          if( (valor % 2) === 1){
            // impar
            return true;
          } else {
            // par
            return false;
          }})
        );

  }

}
