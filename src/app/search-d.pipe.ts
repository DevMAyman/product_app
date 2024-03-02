import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchD',
})
export class SearchDPipe implements PipeTransform {
  transform(products: any[]): any[] {
    return products.filter((product) => {
      product.title.includes('Woman');
    });
  }
}
