import { Pipe, PipeTransform } from '@angular/core';
import { Products } from './products';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Products[], searchTerm: string): Products[] {
    return products.filter((product) =>
      product.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  }
}
