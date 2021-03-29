import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbystatus'
})
export class FilterbystatusPipe implements PipeTransform {
  transform(items: Array<any>, filterby: string): Array<any> {
    return items.filter(item => item.status === filterby);
  }
}
