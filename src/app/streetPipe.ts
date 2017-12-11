import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'streetfilter',
  pure: false
})
export class StreetPipe implements PipeTransform {
  transform(items: any[], selectedTown: string): any {

    return items.filter(item => item.town == selectedTown);
  }
}
