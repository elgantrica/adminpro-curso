import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
,  pure: false
})
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    console.log(Object.keys(value));
      return Object.keys(value) //.map(key => value[key]);
  }
}
