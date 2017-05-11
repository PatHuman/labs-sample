import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false

})
export class FilterPipe implements PipeTransform {

 /* transform(value: any, args?: any): any {
    return null;
  }*/

    transform(items: Array<any>, conditions: {[field: string]: any}): Array<any> {
        return items.filter(item => {
            for (let field in conditions) {
              //  if (item[field] !== conditions[field]) {
                return item[field].includes(conditions[field])

            }
            return true;
        });
    }

}
