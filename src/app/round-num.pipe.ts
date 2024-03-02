import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNum',
})
export class RoundNumPipe implements PipeTransform {
  transform(num: number): unknown {
    if (num - Math.floor(num) >= 0.5) return true;
    else {
      return false;
    }
  }
}
