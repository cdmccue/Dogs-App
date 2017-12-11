import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'townfilter',
  pure: false
})
export class TownPipe implements PipeTransform {

  transform(items: any[]): any {


    var towns = new Array();
    var list = new Array();


    for (let item of items) {
      if (!towns.includes(item.town)) {
        list.push(item);
        towns.push(item.town);
      }
    }

    return list;

  }
}
