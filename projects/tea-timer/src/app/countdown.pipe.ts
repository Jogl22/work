import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    const minutes: number = Math.floor(value / 60);
       return minutes.toString().padStart(2, '0') + ':' + 
           (value - minutes * 60).toString().padStart(2, '0');
  }

}
